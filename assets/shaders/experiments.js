import { Vector2 } from 'three'

const ExperimentalShader = {

    uniforms: {
        'tDiffuse': { value: null },
        'tSize': { value: new Vector2(256, 256) },
        'center': { value: new Vector2(0.5, 0.5) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 },
        'uProgress': { value: 1.0 },
        'resolution': { value: new Vector2(window.innerWidth / 2, window.innerHeight / 2) },
    },

    vertexShader: `
        varying vec2 vUv;

        void main() {

            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform vec2 resolution;
        
        
        void main() {
            float zoom = 0.5;
            vec2 reflection = vUv / resolution;



            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 centeredUV = uv - vec2(0.5);
            centeredUV *= vec2(1.0, resolution.y / resolution.x);
            
            vec4 color = texture2D(tDiffuse, uv);
            
            vec2 reflectionUV = reflection + centeredUV;
            vec4 reflectionColor = texture2D(tDiffuse, reflectionUV);
            
            gl_FragColor = mix(color, reflectionColor, 0.3);
        }
    `
}

export { ExperimentalShader }