uniform float time;
uniform sampler2D uTexture;

varying float pulse;
varying vec2 vUv;
varying vec3 vNormal;

void main(){
    vec4 myimage = texture(
        uTexture, 
        vUv + 0.01*sin(vUv*20. + time)
    );
    // gl_FragColor = vec4(1.0,pulse, 0.0, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    float sinePulse = (1. + sin(vUv.x*50. + time))*0.5;
    // gl_FragColor = vec4(vUv,0.,1.);
    // gl_FragColor = vec4(sinePulse, 0.0, 0.0, 1.0);
    // gl_FragColor = myimage;
    // gl_FragColor = vec4(vNormal, 1.0);
    gl_FragColor = vec4(pulse, 0.0, 0.0, 1.0);
}