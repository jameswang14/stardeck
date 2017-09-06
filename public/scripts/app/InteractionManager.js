/*

   Manipulates the game state based on incoming events. 

*/
define([
    'lib/pixi.min',
    'app/GameStateManager',
    'utils/HitTestRectangle',
    ], function(PIXI, GameStateManager, HitTestRectangle) {
        var instance = null;
        function InteractionManager() {
            if (instance !== null) {
                throw new Error("Cannot instantiate more than one InteractionManager! Use InteractionManager.getInstance()");
            }
            this.initalize();
        }
        InteractionManager.prototype = {
            initalize() {

            },
            checkCanPlayCard(card) {
                console.log(HitTestRectangle(GameStateManager.slot, card));
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


