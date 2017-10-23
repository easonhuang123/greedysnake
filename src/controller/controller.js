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
        this.data = {
            data: {
                snake: this.model.snake,
                food: this.model.food,
                zone: this.model.zone
            }
        }
        let cfg = Object.assign(config, this.data)
        this.view.init(cfg)
    }

    start() {
        let { head, zone } = this.model
        let direction = 'random'
        if (direction === 'random') {
            this.around = ['left', 'right', 'up', 'down']
            this.around = this.around.filter((item) => {
                return head[item] !== -1 && zone[head[item]].fill === undefined
            })
            direction = this.around[(Math.random() * this.around.length)>>0]
        }
        setInterval(() => {
            this.model.go(this.model.head[direction])
            this.view.update(this.data.data)
        },1000)            
    }
}