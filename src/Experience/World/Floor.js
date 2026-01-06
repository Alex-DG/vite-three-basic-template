import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(10, 10)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: 'white',
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }
}
