/*

    Source of truth for game state (eventually). WIP

*/
import 'pixi.js'
import Slot from 'app/objects/Slot'

class GameStateManager {
    constructor() {
        this.initializeSlots();
    }
    initializeSlots() {
        let slots = [];
        let numSlots = 3;
        let slotPadding = 0;
        let slotWidth = 75;
        let slotHeight = 100;
        let startX = 200;
        let startY = 200;

        for (var i = 0; i < numSlots; i++) {
            slots.push(new Slot(startX, startY, slotWidth, slotHeight));
            startX += slotWidth + slotPadding;
        } 
        this.slots = slots;

    }
}

const gsm = new GameStateManager();
export default gsm;