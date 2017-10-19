import './model/Chain'
import Model from './model/model'
import './view/stage'

let config = {
    column: 10,
    row: 10,
    min: 4
}

let model = new Model()

model.init(config)
