import Controller from './controller/controller'

let config = {
    width: 500,
    height: 500,
    column: 10,
    row: 10,
    min: 8,
    color: 0xFFC3DC,
    bound: 0xFF66A5,
    food: 0xFF2424
}

let controller = new Controller()
controller.init(config)
