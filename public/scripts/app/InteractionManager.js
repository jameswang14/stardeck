/*

   Handles rendering detection and routing events accordingly.

*/
import 'pixi.js'
import GameStateManager from 'app/GameStateManager'
import GetRectangleIntersectionArea from 'utils/GetRectangleIntersectionArea'

class InteractionManager {
    constructor() {
        this.selectedSlot = null;
    }
    checkCardHoverOverSlots(card, slots) {
        let largestSlotIntersectArea = 0;
        let largestSlotIntersect = null;
        for (let slot of slots) {
            let intersectArea = GetRectangleIntersectionArea(slot.getBounds(), card.getBounds());
            // TODO: add hover color change logic
            if (intersectArea > largestSlotIntersectArea && !slot.isOccupied) {
                largestSlotIntersectArea = intersectArea;
                largestSlotIntersect = slot;
            }
        }
        let prveSelectedSlot = this.selectedSlot;
        this.selectedSlot = largestSlotIntersect;

        // reset previous slot to red
        if (prveSelectedSlot) {
            prveSelectedSlot.drawSlotRectangle(0xFF0000);
        }

        // set selected slot to blue
        if (this.selectedSlot) {
            this.selectedSlot.drawSlotRectangle(0x0040FF);
        }
    }
    tryPlayCard(card) {
        var returnData = {"success": false};
        if (this.selectedSlot) {
            if (GameStateManager.checkCanPlayCard(card, this.selectedSlot)) {
                GameStateManager.playCard(card, this.selectedSlot);
                returnData = {"success": true, "newPosition": this.selectedSlot.getCenterPosition()};
            }
            // reset to red
            this.selectedSlot.drawSlotRectangle(0xFF00000);
        }
        this.selectedSlot = null;
        return returnData;
    }
    tryAttackCard(card) {
        var returnData = {"success": false};
        if (this.selectedSlot) {
            if (GameStateManager.checkCanPlayCard(card, this.selectedSlot)) {
                GameStateManager.attackCard(card, this.selectedSlot)
                returnData = {"success": true}
            }
            // reset to red
            this.selectedSlot.drawSlotRectangle(0xFF00000);
        }
        this.selectedSlot = null;
        return returnData;
    }
}

const im = new InteractionManager();
export default im;

