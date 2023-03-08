uniform float time;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;

varying vec2 vUv;
varying vec2 vSize;

void main(){
  vUv = uv;
  // set the position to the center of the screen
  vec4 defaultState = modelMatrix * vec4(position, 1.0);
  vec4 fullScreenState = vec4( position, 1.0 );
  // scale the postion to the size of the width and height of the screen
  fullScreenState.x *= uResolution.x/uQuadSize.x;
  fullScreenState.y *= uResolution.y/uQuadSize.y;
  float cornersProgress = mix(
    mix(uCorners.z,uCorners.w,uv.x),
    mix(uCorners.x,uCorners.y,uv.x),
    uv.y
  );

  vec4 finalState = mix(defaultState, fullScreenState, cornersProgress);

  // get the step of the quad on each step of the animation
  vSize = mix(uQuadSize, uResolution, uProgress);
  
  gl_Position = projectionMatrix * viewMatrix * finalState;
}