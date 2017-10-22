// @flow
/*

    Source of truth for game state (eventually). WIP

*/
import 'pixi.js'
import Slot from 'app/objects/Slot'
import type Card from 'app/objects/Card'

class GameStateManager {
    playerSlots: array;
    opponentSlots: array;
    constructor() {
        this.initializeSlots();
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

    checkCanPlayCard(card: Card, slot: Slot): boolean {
        // TODO: add more logic
        if (slot.isOccupied)
            return false;
        return true;
    }
    playCard(card: Card, slot: Slot) {
        slot.addCard(card);
    }
}

const gsm = new GameStateManager();
export default gsm;