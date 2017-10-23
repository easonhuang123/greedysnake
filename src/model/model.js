import Chain from '../utils/Chain'

export default class model{
    constructor() {
        this.zone = []
        this.snake = new Chain()
        let { unshift, pop, push, toString } = this.snake
        this.snake.unshift = (index) => {
            unshift.call(this.snake, index)
            this.updateZone(index, 'snake')
        }
        this.snake.pop = () => {
            let index = pop.call(this.snake).element
            this.updateZone(index, undefined)
        }
        this.snake.push = (index) => {
            push.call(this.snake, index)
            this.updateZone(index, 'snake')
        }
        this.snake.toString = () => {
            toString.call(this.snake)
        }
    }

    init(config = {}) {
        this.zone.length = config.row * config.column
        for (let i = 0, len = this.zone.length; i < len; i++) {
            let [col, row] = [i % config.column, (i / config.row) >> 0]
            this.zone[i] = {
                col: col,
                row: row,
                left: col > 0 ? i - 1 : -1,
                right: col < config.column - 1 ? i + 1 : -1,
                up: row > 0 ? i - config.column : -1,
                down: row < config.row - 1 ? i + config.column : -1
            }
        }
        while (this.snake.length < config.min) {
            let index = this.snake.length ? this.neighbour() : (Math.random() * this.zone.length) >> 0
            this.snake.unshift(index)
        }
        // this.snake.toString()
        this.feed()
    }

    neighbour () {
        let around = [
            this.head.left,
            this.head.right,
            this.head.up,
            this.head.down
        ]
        around = around.filter((index) => {
            if (index !== -1) {
                if (this.zone[index].fill === undefined) {
                    return true
                }
            }
            return false
        })
        return around[(Math.random() * around.length)>>0]
    }

    updateZone(index, fill) {
        this.zone[index].fill = fill
        this.updateHead()
    }

    updateHead () {
        if (this.snake.length !== 0) {
            this.head = this.zone[this.snake.chain[this.snake.head].element]
        }
    }

    bet() {
        let random = Math.random () * this.zone.length >> 0
        return this.zone[random].fill === undefined ? random : -1
    }

    feed() {
        this.food = this.bet()
        if (this.food === -1) {
            let len = this.zone.length - this.snake.length
            let count = 0
            let index = 0
            let random = (Math.random() * len >> 0)+ 1
            while (count !== random) {
                this.zone[index++].fill === undefined && count++
            }
            this.food = index - 1
        }
        this.updateZone(this.food, 'food')
    }

    move (next) {
        this.snake.unshift(next)
        this.snake.pop()
    }
    
    eat (next) {
        this.snake.unshift(next)
        this.feed()
    }

    go (next) {
        let cell = -1 === next ? 'bound' : this.zone[next].fill
        switch (cell) {
            case 'food':
                this.eat(next)
                break
            case 'snake':
                console.log('u die snake')
                break
            case 'bound':
                console.log('u die bound')
                break
            default:
                this.move(next)
        }
    }
}
