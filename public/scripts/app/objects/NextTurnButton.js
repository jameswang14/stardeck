import 'pixi.js'


export default class NextTurnButton extends PIXI.Sprite {
    constructor(texture, position) {
        super(texture);
        this.position = position;
        this.buttonMode = true;
        this.interactive = true;

        this
            // .on('mouseover', this.onDragStart)
            // .on('touchstart', this.onDragStart)
            
            .on('mouseup', this.onRelease)
            // .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onRelease);
            // .on('touchendoutside', this.onDragEnd)
            
            // .on('mousemove', this.onDragMove)
            // .on('touchmove', this.onDragMove);


    } 
    onRelease(e) {
    	console.log("click");

    }

}
   

