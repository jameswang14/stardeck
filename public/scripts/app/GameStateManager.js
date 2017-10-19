/*

    Source of truth for game state (eventually). WIP

*/
define([
    'lib/pixi.min',
    'app/objects/Slot'
    ], 
    function(PIXI, Slot) {
        var instance = null;
        function GameStateManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one GameStateManager! Use GameStateManager.getInstance()");
            }
            this.initalize();
        }

        var numSlots = 3;
        var slotPadding = 0;
        var slotWidth = 75;
        var slotHeight = 100;

        GameStateManager.prototype = {
            initalize() {
                slots = [];
                var startX = 200;
                var startY = 200;
                for (var i = 0; i < numSlots; i++) {
                    slots.push(new Slot(startX, startY, slotWidth, slotHeight));
                    startX += slotWidth + slotPadding;
                } 
                this.slots = slots;
            }
        };

        GameStateManager.getInstance = function() {
            if (instance === null) 
                instance = new GameStateManager();
            return instance;
        }
        return GameStateManager.getInstance();        
    }
);
