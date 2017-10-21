/*

   Manipulates the game state based on incoming events. 

*/
import 'pixi.js'
import GameStateManager from 'app/GameStateManager'
import GetRectangleIntersectionArea from 'utils/GetRectangleIntersectionArea'

class InteractionManager {
    constructor() {
        this.selectedSlot = null;
    }
    checkCardHoverOverSlot(card) {
        let largestSlotIntersectArea = 0;
        let largestSlotIntersect = null;
        for (let slot of GameStateManager.playerSlots) {
            let intersectArea = GetRectangleIntersectionArea(slot.getBounds(), card.getBounds());
            if (intersectArea > largestSlotIntersectArea && !slot.isOccupied) {
                largestSlotIntersectArea = intersectArea;
                largestSlotIntersect = slot;
            
            }
        }
        let prveSelectedSlot = this.selectedSlot;
        this.selectedSlot = largestSlotIntersect;

        // reset previous slot to red
        if (prveSelectedSlot) 
            prveSelectedSlot.drawSlotRectangle(0xFF0000);

        // set selected slot to blue
        if (this.selectedSlot) 
            this.selectedSlot.drawSlotRectangle(0x0000FF);
    }
    tryPlayCard(card) {
        /* TODO: decompose this logic
            IM checks intersection
            GSM checks game state
            Card updates position and status
            GSM updates game state and fires server event
        */
        if (this.selectedSlot) {
            this.selectedSlot.addCard(card);
            card.setBasePosition(this.selectedSlot.getCenterPosition());

            // reset to red
            this.selectedSlot.drawSlotRectangle(0xFF00000);
        }
        this.selectedSlot = null;
    }
}

const im = new InteractionManager();
export default im;

