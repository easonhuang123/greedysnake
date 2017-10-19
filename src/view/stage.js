import PIXI from '../utils/pixi.min'

let renderer = PIXI.autoDetectRenderer(600, 600, {
        backgroundColor: 0x0099bb
    }
)


let stage = new PIXI.Container()


let node = new PIXI.Graphics()
node.beginFill(0x66CCFF)
node.drawRect(0, 0, 24, 24)
node.endFill()
node.x = 170
node.y = 170
stage.addChild(node)

renderer.render(stage)
document.body.appendChild(renderer.view)