import { Vector2 } from 'three'

const CurtainShader = {

    uniforms: {
        'tDiffuse': { value: null },
        'tSize': { value: new Vector2(256, 256) },
        'center': { value: new Vector2(0.5, 0.5) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 },
        'uProgress1': { value: 1.0 },
        'uProgress2': { value: 1.0 },
        'uProgress3': { value: 1.0 },
    },

    vertexShader: `
        varying vec2 vUv;

        void main() {

            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform vec2 center;
        uniform vec2 tSize;
        uniform float angle;
        uniform float scale;
        uniform float uProgress1;
        uniform float uProgress2;
        uniform float uProgress3;

        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main() {
            vec2 p = vUv;

            

            if( p.x < 0.20 ) {

                p.x = p.x + 0.65 * uProgress3;
                
            } else if( p.x < 0.4) {
                
                p.x = p.x - 0.25 * uProgress1;
                
            } else if( p.x < 0.6) {
                
                p.x = p.x + 0.25 * uProgress3;
                
            } else if( p.x < 0.8) {
                
                p.x = p.x + 0.25 * uProgress1;
                
            } else {

                p.x = p.x - 0.65 * uProgress3;
                
            }

            // p += 0.5 * sin(5. * vUv.x);

            vec4 color = texture2D( tDiffuse, p);

            gl_FragColor = color;
        }


    `
}

export { CurtainShader }