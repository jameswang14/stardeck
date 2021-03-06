/*

    Source of truth for game state and manipulation.

*/
import 'pixi.js'
import Slot from 'app/objects/Slot'
import Player from 'app/objects/Player.js'

class GameStateManager {
    constructor() {
        this.initializeSlots();
        // values should only be 1 or 2;
        this.currentTurn = 1;
    }
    initializeSlots() {
        let NUM_SLOTS_PER_PLAYER = 3;
        let SLOT_PADDING = 0;
        let SLOT_WIDTH = 75;
        let SLOT_HEIGHT = 100;

        // initialize player's slots
        let slots = [];
        let startX = 200;
        let startY = 200;
        for (var i = 0; i < NUM_SLOTS_PER_PLAYER; i++) {
            slots.push(new Slot(startX, startY, SLOT_WIDTH, SLOT_HEIGHT));
            startX += SLOT_WIDTH + SLOT_PADDING;
        } 
        this.playerSlots = slots;

        // initialize opponent's slots
        slots = [];
        startX = 200;
        startY = 50;
        for (var i = 0; i < NUM_SLOTS_PER_PLAYER; i++) {
            slots.push(new Slot(startX, startY, SLOT_WIDTH, SLOT_HEIGHT));
            startX += SLOT_WIDTH + SLOT_PADDING;
        } 
        this.opponentSlots = slots;
    }
    checkCanPlayCard(card, slot) {
        // TODO: add more logic
        if (slot.isOccupied || Player.resources < card.cost)
            return false;
        return true;
    }
    // server-verify
    playCard(card, slot) {
        Player.setResources(Player.resources - card.cost);
        if (this.infoPane)
            this.infoPane.update();
        slot.addCard(card);
    }
    checkCanAttackCard(card, slot) {
        // TODO: add logic
        // Technically shouldn't ever fire but just in case...
        if (!slot.isOccupied)
            return false;
        return true;

    }
    // server-verify
    attackCard(card, slot) {
        let targetCard = slot.card;
    }
    // server-verify
    changeTurn() {
        if (this.currentTurn == 1)
            this.currentTurn = 2;
        else
            this.currentTurn = 1;
    }

}

const gsm = new GameStateManager();
export default gsm;