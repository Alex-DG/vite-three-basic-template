import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cube {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
    }

    setMaterial() {
        this.material = new THREE.MeshNormalMaterial()
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.position.y = 0.5
        this.mesh.rotation.y = Math.PI / 4
        this.scene.add(this.mesh)
    }

    update() {
        this.mesh.rotation.y += this.time.delta * 0.001
    }
}
