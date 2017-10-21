import 'pixi.js'
import GetRectangleIntersectionArea from 'utils//GetRectangleIntersectionArea.js'

export default class Slot extends PIXI.Container {
    constructor(x, y, width, height) {
        super();
        var lineThickness = 5;
        this.card = null;
        this.isOccupied = false;
        this.position.set(x, y);

        let graphics = new PIXI.Graphics();
        graphics.lineStyle(lineThickness, 0xFF0000);
        graphics.drawRect(x, y, width, height);
        this.addChild(graphics);

        this.rectGraphics = graphics; // safer than relying on getChild
        this.fixedWidth = width;
        this.fixedHeight = height;
    }
    // Defaults to red
    drawSlotRectangle(color=0xFF0000) {
        var lineThickness = 5;
        this.rectGraphics.lineStyle(lineThickness, color);
        this.rectGraphics.drawRect(this.x, this.y, this.fixedWidth, this.fixedHeight);

    } 
    getCenterPosition() {
        return new PIXI.Point(this.x + this.fixedWidth / 2, this.y + this.fixedHeight / 2);
    }
    addCard(card) {
        if (this.card == null) {
            this.addChild(card);
            this.card = card; 
            this.isOccupied = true;
        }
    }
    removeCard() {
        if (this.card != null) {
            this.removeChild(card);
            this.card = null;
            this.isOccupied = false;
        }
    }
}
