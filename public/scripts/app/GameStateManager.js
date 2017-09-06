/*

    Source of truth for game state (eventually). WIP

*/
define([
    'lib/pixi.min',
    'app/objects/Slot'
    ], function(PIXI, Slot) {
        var instance = null;
        function GameStateManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one GameStateManager! Use GameStateManager.getInstance()");
            }
            this.initalize();
        }

        GameStateManager.prototype = {
            initalize() {
                this.slot = new Slot([200, 200]);
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
