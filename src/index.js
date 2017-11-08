import Controller from './controller/controller'
import './style/style.css'
import 'font-awesome-webpack'
let config = {
    width: 300,
    height: 300,
    column: 20,
    row: 20,
    min: 4,
    color: 0x55A7DD,
    bound: 0x75AFCC,
    food: 0xDD1114
}

let controller = new Controller()
controller.init(config)

controller.start()

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
    controller.trigger()
})
document.querySelector('.snake-start').addEventListener("click", () => {
    controller.restart()
})

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 38) { 
        controller.turn('up')
    } else if (e && e.keyCode == 39) { 
        controller.turn('right')
    } else if (e && e.keyCode == 40) { 
        controller.turn('down')
    } else if (e && e.keyCode == 37) { 
        controller.turn('left')
    }
}; 


