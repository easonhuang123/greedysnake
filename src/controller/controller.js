import Model from '../model/model'
import View from '../view/view'

export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View()
    }
    
    init(config) {
        this.model.init(config)
        this.config = config
        let data = {
            data: {
                snake: this.model.snake,
                food: this.model.food,
                zone: this.model.zone
            }
        }
        let cfg = Object.assign(config, data)
        this.view.init(cfg)
        this.food = this.model.food
        this.update()
    }

    start() {
        let { head, zone } = this.model
        this.direction = 'random'
        if (this.direction === 'random') {
            this.around = ['left', 'right', 'up', 'down']
            this.around = this.around.filter((item) => {
                return head[item] !== -1 && zone[head[item]].fill === undefined
            })
            this.direction = this.around[(Math.random() * this.around.length)>>0]
        }
        setInterval(() => {
            this.model.go(this.model.head[this.direction])
            this.update()
        },700)            
    }

    update() {
        let data = {
            snake: this.model.snake,
            food: this.model.food,
            zone: this.model.zone
        }
        this.view.update(data)
    }

    turn(direction) {
        this.direction = direction
    }
}