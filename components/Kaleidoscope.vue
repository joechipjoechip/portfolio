<script setup>

import { useEventListener } from '@vueuse/core';

import { useUserStore } from '@/stores/user';

const store = useUserStore()

onMounted(() => {
    handleKalei()
})

const img = ref(null)

function handleKalei(){

    let ks, kx, ky;

    function partitions(display, img, scale) {
        let c1 = document.createElement('canvas');
        let c2 = document.createElement('canvas');
        let w = c1.width = c2.width = img.naturalWidth || img.width;
        let h = c1.height = c2.height = img.naturalHeight || img.height;
        let $ = c1.getContext('2d');
        let $$ = c2.getContext('2d');
        $.drawImage(img, 0, 0);
        
        while (scale < 0.3) {
            $$.clearRect(0, 0, w / 2, h / 2);
            $$.drawImage(c1, 0, 0, w, h, 0, 0, w / 2, h / 2);
            w /= 2;
            h /= 2;
            scale *= 2;
            const hiddencanvas = c1;
            c1 = c2;
            c2 = hiddencanvas;
            const hiddencontext = $;
            $ = $$;
            $$ = hiddencontext;
        }

        display.width = w * scale;
        display.height = h * scale;
        display.getContext('2d').drawImage(c1, 0, 0, w, h, 0, 0, w * scale, h * scale);

    };

    const opts = {
        speed: 0.005,
        segmentSize: 150,
        smoothing: 0.8,
    };

    class Obj {

        constructor(canvas, segmentMotion){
            
            this._c = canvas;
            this._$ = canvas.getContext('2d');
            this.segmentWidth = segmentMotion;
            this.segmentHeight = segmentMotion * Math.sqrt(3) / 2;
    
            this.fillStyle = 'hsla(0,0%,0%,1)';
            this.offsetX = 0;
            this.offsetY = 0;
            this.rotation = 0;
    
            this.stock = document.createElement('canvas');
            this.stock.width = segmentMotion * 9 / 2;
            this.stock.height = segmentMotion;
            this.stockctx = this.stock.getContext('2d');

        }

        draw() {
            var _$_ = this.stockctx;
            var w = this.segmentWidth;
            var h = this.segmentHeight;
            _$_.fillStyle = this.fillStyle;
            _$_.strokeStyle = this.fillStyle;
            _$_.clearRect(0, 0, this.stock.width, this.stock.height);

            this.drawSegment(_$_, 0, 0, 0, false);
            this.drawSegment(_$_, w, 0, Math.PI / 3, true);
            this.drawSegment(_$_, w * 3 / 2, h, Math.PI * 4 / 3, false);
            this.drawSegment(_$_, w * 5 / 2, h, Math.PI * 3 / 3, true);
            this.drawSegment(_$_, w * 3, 0, Math.PI * 2 / 3, false);
            this.drawSegment(_$_, w * 5 / 2, h, Math.PI * 5 / 3, true);

            _$_ = this._$;
            var ofsX = 0;
            var heightstart = -1;
            var initPOV = 0;
            var heightend = Math.ceil(this._c.width / (w * 3));
            var finalPOV = Math.ceil(this._c.height / h);

            _$_.clearRect(0, 0, this._c.width, this._c.height);
            for (var i = initPOV; i < finalPOV; i++) {
                for (var j = heightstart; j < heightend; j++) {
                    _$_.drawImage(this.stock, j * w * 3 + ofsX, i * h);
                }
                ofsX = w * 3 / 2 - ofsX;
            }
        }

        resize(w, h) {
            this._c.width = w;
            this._c.height = h;
        }

        setImage(img) {
            var calibrate = Math.max(this.segmentWidth / img.naturalWidth, this.segmentHeight / img.naturalHeight);

            if (calibrate < 1.0) {
                var pre = document.createElement('canvas');
                partitions(pre, img, calibrate);
                this.fillStyle = this.stockctx.createPattern(pre, 'repeat');
            } else {
                this.fillStyle = this.stockctx.createPattern(img, 'repeat');
            }
        }

        drawSegment(_$_, kx, ky, dt, reverse) {
            var w = this.segmentWidth;
            var h = this.segmentHeight;

            _$_.save();
            _$_.translate(kx, ky);
            _$_.rotate(dt);
            if (reverse) {
                _$_.translate(w, 0);
                _$_.scale(-1, 1);
            }
            _$_.beginPath();
            _$_.moveTo(0, 0);
            _$_.lineTo(w, 0);
            _$_.lineTo(w / 2, h);
            _$_.closePath();
            _$_.translate(this.offsetX, this.offsetY);
            _$_.rotate(this.rotation);
            _$_.fill();
            _$_.stroke();
            _$_.restore();
        }

    };

    function ready() {
        const c = document.getElementById('canvasElement');
        ks = new Obj(c, opts.segmentSize);
        ks.resize(window.innerWidth, window.innerHeight);
        kx = 0;
        ky = 0;

        setImage();

        useEventListener(window, 'mousemove', (e) => {
            kx = (e.clientX / window.innerWidth - 0.5) * opts.segmentSize;
            ky = (e.clientY / window.innerHeight - 0.5) * opts.segmentSize;
        });

    }

    function draw() {
        ks.offsetX += (kx - ks.offsetX) * opts.smoothing;
        ks.offsetY += (ky - ks.offsetY) * opts.smoothing;
        ks.rotation += opts.speed;
        ks.draw();
        window.requestAnimationFrame(draw);
    }

    function setImage() {
        ks.setImage(img.value);
    }

    ready();
    draw();

    console.log('Thank you @tmrDevelops for the kaleidoscope effect base code ❤');

}

</script>

<template>

    <div class="canvas-wrapper"
        :class="{
            'isGreyed': store.navigation.navbar.isMoving
        }"
    >

        <canvas
                id="canvasElement" 
                ref="c"
        ></canvas>
        
        <img 
            src="@/assets/images/kaleidoscope/004.png" 
            alt="" 
            ref="img"
            style="display: none;"
        >

    </div>


</template>

<style lang="scss" scoped>

    .canvas {

        &-wrapper {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
            // opacity: 0.8;

            backdrop-filter: blur(0);
            filter: grayscale(0);

            transition: 
                // opacity var(--transitionDurationLong),
                filter var(--transitionDurationLong),
                backdrop-filter var(--transitionDurationLong);

            &.isGreyed {
                // opacity: 0;
                filter: grayscale(1);
                backdrop-filter: blur(80px);
            }

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background: linear-gradient(
                    0deg, 
                    rgb(0 0 0) 20%,
                    rgb(0 0 0 / 91%) 70%, 
                    rgb(46 40 112 / 49%) 90%
                );
            }
        }

    }
		
</style>

