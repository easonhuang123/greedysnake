import Controller from './controller/controller'
import './style/style.css'
let config = {
    width: 500,
    height: 500,
    column: 20,
    row: 20,
    min: 8,
    color: 0xFFC3DC,
    bound: 0xFF66A5,
    food: 0xFF2424
}

let controller = new Controller()
controller.init(config)

document.querySelector('.snake-up').addEventListener("click", () => {
    controller.turn('up')
})
document.querySelector('.snake-right').addEventListener("click", () => {
    controller.turn('right')
})
document.querySelector('.snake-down').addEventListener("click", () => {
    controller.turn('down')
})
document.querySelector('.snake-left').addEventListener("click", () => {
    controller.turn('left')
})
document.querySelector('.snake-trigger').addEventListener("click", () => {
    controller.start()
})


