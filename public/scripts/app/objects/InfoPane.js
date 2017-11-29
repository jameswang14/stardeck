import 'pixi.js'
import Player from 'app/objects/Player.js'
// Draws text for the player's current status
// Display complement to the Player class essentially 

export default class InfoPane extends PIXI.Container {
    constructor(position) {
        super();
        this.position = position;
        var style = new PIXI.TextStyle({
             fontSize: 14
        });
        this.resourcesText = new PIXI.Text("Resources: " + Player.resources, style);
        this.resourcesText.x = 0;
        this.resourcesText.y = 0;
        this.addChild(this.resourcesText);
        // this.numCardsText = new PIXI.Text()
    }

    update() {
        this.resourcesText.text = "Resources: " + Player.resources;
    }
}


