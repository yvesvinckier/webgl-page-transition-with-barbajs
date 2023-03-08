import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import * as dat from "dat.gui";

import testTexture from "./textures/texture.jpg";

export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      10,
      1000
    );
    this.camera.position.z = 600;

    // * 180/Math.PI is to convert radians to degrees
    // set the fov so the plane fits the size of the plane (350)
    this.camera.fov = (2 * (Math.atan(this.height / 2 / 600) * 180)) / Math.PI;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;
    this.setupSettings();
    this.resize();
    this.addObjects();
    this.render();
    this.setupResize();
  }

  setupSettings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    // want the progress to be between 0 and 1 with a step of 0.001
    this.gui.add(this.settings, "progress", 0, 1, 0.001);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  addObjects() {
    // 350 is the size of the plane 100 is the number of segments
    this.geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        time: { value: 1.0 },
        uProgress: { value: 0.0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexture) },
        // the size of the texture : 100x100 because it's a square
        uTextureSize: { value: new THREE.Vector2(100, 100) },
        // the width and the height of the screen => the final size of the plane
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        // the starter size of the plane
        uQuadSize: { value: new THREE.Vector2(300, 300) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 300;
    this.mesh.rotation.z = 0.5;
    this.scene.add(this.mesh);
  }
  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    // this mean my webgl is adjustable
    this.material.uniforms.uProgress.value = this.settings.progress;
    this.mesh.rotation.x = this.time / 2000;
    this.mesh.rotation.y = this.time / 1000;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  domElement: document.getElementById("container"),
});
