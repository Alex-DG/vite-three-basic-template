import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.domElement

    // Arrow function so we don't need manual binding
    this.resize = () => {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    // Arrow function for continuous rendering
    this.update = () => {
      // Update controls
      this.controls.update()

      // Render the scene
      this.renderer.render(this.scene, this.camera)

      // Request next frame
      window.requestAnimationFrame(this.update)
    }

    // Initialize the experience
    this.init()
  }

  init() {
    this.setSizes()
    this.setRenderer()
    this.setCamera()
    this.setCube()

    // Listen for window resize
    window.addEventListener('resize', this.resize)

    // Start rendering
    this.update()

    console.log('🤖 Experience initialized')
  }

  setSizes() {
    this.sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight || window.innerHeight,
    }
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    this.camera.position.set(1, 1, 1)
    this.scene.add(this.camera)

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  }

  setCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }
}

export default Experience
