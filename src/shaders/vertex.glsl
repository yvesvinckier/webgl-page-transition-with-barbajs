uniform float time;
varying float pulse;

varying vec2 vUv;

void main(){
    vUv = uv;
    vec3 newPosition = position;
    // newPosition.z = 0.5*sin(newPosition.x*30. + time);
    newPosition.z = 0.05*sin(length(position)*30. + time);
    pulse = 20.*newPosition.z;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}