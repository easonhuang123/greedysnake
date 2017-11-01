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
        this.TURNON = true
        this.GAMEOVER = false
    }

    start() {
        let { head, zone } = this.model
        if (this.direction === undefined) {
            this.around = ['left', 'right', 'up', 'down']
            this.around = this.around.filter((item) => {
                return head[item] !== -1 && zone[head[item]].fill === undefined
            })
            this.direction = this.around[(Math.random() * this.around.length)>>0]
        }
        this.update()
    }

    trigger() {
        if (this.GAMEOVER) {
            return
        }
        let interval = setInterval(() => {
            if (this.TURNON) {
                clearInterval(interval)
            } else {
                this.model.go(this.model.head[this.direction])
                this.update() 
            }
        }, 200)
        this.TURNON = !this.TURNON
    }

    update() {
        let data = {
            snake: this.model.snake,
            food: this.model.food,
            zone: this.model.zone
        }
        this.view.update(data)
        if (this.model.mark !== undefined) {
            this.GAMEOVER = true
            this.TURNON = true
        }
    }

    turn(direction) {
        let opposite = {
            'left': 'right',
            'right': 'left',
            'up': 'down',
            'down': 'up'
        }
        if (opposite[direction] !== this.direction) {
            this.direction = direction
        }
    }

    destory() {
        this.model.destory()
        this.view.destory()
    }

    restart() {
        this.destory()
        this.init(this.config)
        this.start()
        this.TURNON = false
        console.log(this.GAMEOVER)
        this.trigger()
    }
}