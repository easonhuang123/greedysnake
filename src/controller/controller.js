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
                snake: this.model.snake.chain,
                food: this.model.food
            }
        }
        let cfg = Object.assign(config, data)
        this.view.init(cfg)
        setInterval(() => {
            this.model.go(this.model.snake.head - 1)
            this.model.snake.toString()
        }, 2000)
    }

    start() {
        setInterval(() => {
            let next = this.model.snake.chain[this.model.snake.head].next
            switch (next) {
                case this.model.snake.head + 1: this.model.go(this.model.snake.head - 1)
                    break
                case this.model.snake.head - 1: this.model.go(this.model.snake.head + 1)
                    break
                case this.model.snake.head + this.config: this.model.go(this.model.snake.head - this.config)
                    break   
                case this.model.snake.head - this.config: this.model.go(this.model.snake.head + this.config)
                    break 
            }
            this.model.snake.toString()
        }, 50)
    }
}