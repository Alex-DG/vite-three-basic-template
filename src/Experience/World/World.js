import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.setCube()
        this.setFloor()
        this.setEnvironment()
    }

    setCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshNormalMaterial()
        this.cube = new THREE.Mesh(geometry, material)
        this.cube.castShadow = true
        this.cube.receiveShadow = true
        this.cube.position.y = 0.5
        this.cube.rotation.y = Math.PI / 4
        this.scene.add(this.cube)
    }

    setFloor() {
        const geometry = new THREE.PlaneGeometry(10, 10)
        const material = new THREE.MeshStandardMaterial({
            color: 'white',
        })
        const floor = new THREE.Mesh(geometry, material)
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI * 0.5
        this.scene.add(floor)
    }

    setEnvironment() {
        this.environment = new Environment()
    }

    update() {
        if (this.cube) {
            this.cube.rotation.y += this.experience.time.delta * 0.001
        }
    }
}
