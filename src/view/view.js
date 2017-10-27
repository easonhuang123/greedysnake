import PIXI from '../utils/pixi.min'
import Chain from '../utils/Chain'

export default class View {
    constructor() {
        this.app = PIXI.autoDetectRenderer(550, 550, 
            { 
				transparent: true
			}
        )
        this.snake = new Chain()
        let { unshift, pop, push } = this.snake
        this.snake.unshift = (index) => {
            unshift.call(this.snake, index)
            let node = this.snake.chain[this.snake.head].node = this.drawPoint(this.config.color)
            this.setPosition(node, index)
        }
        this.snake.push = (index) => {
            push.call(this.snake, index)
            let node = this.snake.chain[this.snake.tail].node = this.drawPoint(this.config.color)
            this.setPosition(node, index)
        }
        this.snake.pop = () => {
            this.collect(pop.call(this.snake).node)
        }
        this.colletion = []
        let node = document.getElementById('snake-game')
        node.appendChild(this.app.view)
    }

    init(config = {}) {
        this.stage = new PIXI.Container()
        this.config = config
        this.config.size = {
            width: config.width / config.column,
            height: config.height / config.row
        }
        this.drawBound()
        this.food = this.drawPoint()
        this.food.graphicsData[0].fillColor = this.config.food
        for (let { element } of this.config.data.snake) {
            this.snake.push(element)
        }
    }

    drawBound() {
        let bound = (new PIXI.Graphics())
            .beginFill(0xffffff, 1)
            .lineStyle(8, this.config.bound, 1)
            .drawRect(0, 0, this.config.width + 8, this.config.height + 8)
            .endFill()
        bound.x = bound.y = (this.app.view.width - bound.cwidth) / 2
        this.stage.addChild(bound)
    }

    feed(food) {
        this.setPosition(this.food, food)
    }

    drawPoint(color = this.config.color) {
        let node
        if (this.colletion = []) {
            node = new PIXI.Graphics()
            let { width, height } = this.config.size
            node.beginFill(color)
            node.drawRect(0, 0, width, height)
            node.endFill()
            node.x = 0
            node.y = 0
        } else {
            node = this.colletion.pop()
        }
        this.stage.addChild(node)
        return node
    }

    setPosition(node, index) {
        let x = index % this.config.column
        let y = Math.floor(index / this.config.row)
        let { width, height } = this.config.size
        node.x = x * width
        node.y = y * height
    }

    collect(node) {
        this.colletion.push(node)
        this.stage.removeChild(node)
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
                reject()
			}
		); 
	}

    updateTail(snakeM, snakeV) {
		return new Promise(
            (resolve, reject) => {
				while(snakeV.length !== 0) {
                    if (snakeM.chain[snakeM.tail].element === snakeV.chain[snakeV.tail].element) {
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
