import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Cube from './Cube.js'
import Floor from './Floor.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.cube = new Cube()
        this.floor = new Floor()
        this.environment = new Environment()
    }

    update() {
        if (this.cube) {
            this.cube.update()
        }
    }
}
