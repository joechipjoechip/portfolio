import { Vector2 } from 'three'

const CurtainShader = {

    uniforms: {
        'tDiffuse': { value: null },
        'tSize': { value: new Vector2(256, 256) },
        'center': { value: new Vector2(0.5, 0.5) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 },
        'uProgress': { value: 1.0 },
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
        uniform float uProgress;

        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        void main() {
            vec2 p = vUv;

            

            if( p.x < 0.25 ) {

                p.x = p.x + 0.65 * uProgress;
                
            } else if( p.x < 0.5) {
                
                p.x = p.x - 0.25 * uProgress;
                
                
            } else if( p.x < 0.75) {
                
                p.x = p.x + 0.35 * uProgress;
                
                
            } else {

                p.x = p.x - 0.65 * uProgress;
                
            }

            p += 0.1 * sin(5. * vUv.x) * uProgress;

            vec4 color = texture2D( tDiffuse, p);

            gl_FragColor = color;
        }


    `
}

export { CurtainShader }