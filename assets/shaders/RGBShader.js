import { Vector2 } from 'three'

const RGBShader = {

    uniforms: {
        'tDiffuse': { value: null },
        'tSize': { value: new Vector2(256, 256) },
        'center': { value: new Vector2(0.5, 0.5) },
        'angle': { value: 1.57 },
        'scale': { value: 1.0 },
        'uMouseX': { value: 0.0 },
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
        uniform float uMouseX;

        uniform sampler2D tDiffuse;

        varying vec2 vUv;

    

        void main() {
            vec2 p = vUv;

            vec4 cr = texture2D(tDiffuse, p + uMouseX * vec2(0.1,0.));
            vec4 cg = texture2D(tDiffuse, p);
            vec4 cb = texture2D(tDiffuse, p - uMouseX * vec2(0.1,0.));


            gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);
        }`

}

export { RGBShader }