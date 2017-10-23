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

    feed(food) {
        this.drawPoint(food, this.config.food)
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

    update(data) {
        this.food !== data.food && this.feed(data.food)
        this.updateSnake(data.snake)
    }

    
    updateSnake(snakeM, snakeV = this.snake) { 
		this.updateTail(snakeM, snakeV)
			.then(() => this.updateHead(snakeM, snakeV))
			.catch(() => this.wholeUpdate(snakeM, snakeV))
            .then(() => this.render())
	}

	updateHead(snakeM, snakeV) { 
		return new Promise(
            (resolve, reject) => {
                while (snakeV.length <= snakeM.length) {
					if(snakeM.chain[snakeM.head].element === snakeV.chain[snakeV.head].element) {
                        return resolve(); 
					}
                    else { 
                        snakeV.unshift(snakeM.chain[snakeM.head].element)
					}
				}
			}
		); 
	}

    updateTail(snakeM, snakeV) {
		return new Promise(
            (resolve, reject) => {
				let tailM = snakeM.tail, tailV
				while(snakeV.length !== 0) { 
					tailV = snakeV.tail
                    if (snakeM.chain[tailM].element === snakeV.chain[tailV].element) {
						return resolve()
					}
					else {
						snakeV.pop()
					}
				}
				reject()
			}
		); 
	}

	// 全量更新
	wholeUpdate(snakeA, snakeB) { 
		console.log("badbadbad"); 
	}

	// 渲染 
	render() {
		this.app.render(this.stage)
	}
}
