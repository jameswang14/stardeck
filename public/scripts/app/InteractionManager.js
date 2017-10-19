/*

   Manipulates the game state based on incoming events. 

*/
define([
    'lib/pixi.min',
    'app/GameStateManager',
    'utils/GetRectangleIntersectionArea',
    ], function(PIXI, GameStateManager, GetRectangleIntersectionArea) {
        var instance = null;
        // the slot being hovered over or being interacted with
        var selectedSlot = null;
        function InteractionManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one InteractionManager! Use InteractionManager.getInstance()");
            }
            this.initalize();
        }
        InteractionManager.prototype = {
            initalize() {

            },
            /*
                Choose the slot that the card intersects the most with in terms of area.
                Set that to selectedSlot and highlight it as blue

                Could probably do some microoptimization here, where if a card is selected, you only have to 
                check intersections for neighboring cards. This probably isn't necessary unless we have a lot 
                of slots.
                TODO: if slot already has card, don't highlight/assign
            */
            checkCardHoverOverSlot(card) {
                largestSlotIntersectArea = 0;
                largestSlotIntersect = null;
                for (slot of GameStateManager.slots) {
                    intersectArea = GetRectangleIntersectionArea(slot.getBounds(), card.getBounds());
                    if (intersectArea > largestSlotIntersectArea && !slot.isOccupied) {
                        largestSlotIntersectArea = intersectArea;
                        largestSlotIntersect = slot;
                    
                    }
                }
                prveSelectedSlot = selectedSlot;
                selectedSlot = largestSlotIntersect;

                if (prveSelectedSlot) 
                    prveSelectedSlot.drawSlotRectangle(0xFF0000);

                if (selectedSlot) 
                    selectedSlot.drawSlotRectangle(0x0000FF);
            },
            checkCanPlayCard(card) {
                if (selectedSlot) {
                    selectedSlot.addCard(card);
                    card.setBasePosition(selectedSlot.getCenterPosition());
                    // reset to red
                    selectedSlot.drawSlotRectangle(0xFF00000);
                }
                selectedSlot = null;
            }
        };

        InteractionManager.getInstance = () => {
            if (instance === null) 
                instance = new InteractionManager();
            return instance;
        }
        return InteractionManager.getInstance();    
    }
);


