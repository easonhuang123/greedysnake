import PIXI from '../utils/pixi.min'
import Chain from '../utils/Chain'

export default class View {
    constructor() {
        this.app = PIXI.autoDetectRenderer(700, 700, 
            { 
				transparent: true
			}
        )
        this.snake = new Chain()
        let { unshift, pop, push } = this.snake
        this.snake.unshift = (index) => {
            unshift.call(this.snake, index)
            this.drawPoint(index, this.config.color)
        }
        this.snake.push = (index) => {
            push.call(this.snake, index)
            this.drawPoint(index, this.config.color)
        }
        this.snake.pop = () => {
            pop.call(this.snake)
        }
        document.body.appendChild(this.app.view)
    }

    init(config = {}) {
        this.stage = new PIXI.Container()
        this.config = config
        this.config.size = {
            width: config.width / config.column,
            height: config.height / config.row
        }
        this.drawBound()
        this.feed()
        for (let { element } of this.config.data.snake) {
            this.snake.push(element)
        }
        
    }

    drawBound() {
        let bound = (new PIXI.Graphics())
            .beginFill(0xffffff, 1)
            .lineStyle(8, this.config.bound, 1)
            .drawRect(0, 0, this.config.width + 8, this.config.height + 8)
        bound.x = bound.y = (this.app.view.width - bound.cwidth) / 2
        this.stage.addChild(bound)
    }

    feed() {
        this.drawPoint(this.config.data.food, this.config.food)
    }

    drawPoint(index, color) {
        let node = new PIXI.Graphics()
        let { width, height } = this.config.size
        let { x, y } = this.getPosition(index)
        node.beginFill(color)
        node.drawRect(0, 0, width, height)
        node.endFill()
        node.x = x * width
        node.y = y * height
        this.stage.addChild(node)
        this.app.render(this.stage)
    }

    getPosition(index) {
        let x = index % this.config.column
        let y = Math.floor(index / this.config.row)
        return { x: x, y: y}
    }
}
