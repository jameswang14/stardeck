// @flow
import 'pixi.js'
import InteractionManager from 'app/InteractionManager'
import GameStateManager from 'app/GameStateManager'
import CardStatusEnum from 'app/enums/CardStatusEnum'

export default class Card extends PIXI.Sprite {
    constructor(texture: PIXI.Texture, name: string, basePosition: PIXI.Point) {
        super(texture);
        this.basePosition = basePosition;
        this.resetToBasePosition();
        // this will allow it to respond to mouse and touch events
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);

        this.status = CardStatusEnum.IN_DECK;

        // setup events
        this
            // events for drag start
            .on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            // events for drag end
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            // events for drag move
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);
    }
    setBasePosition(position: PIXI.Point) {
        this.basePosition = position;
    }
    resetToBasePosition() {
        this.position = this.basePosition;
        this.interactive = true;
    }
    setStatus(status: string) {
        this.status = status;
    }
    onDragStart(event: any) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
    }
    onDragEnd() {
        switch(this.status) {
            case CardStatusEnum.IN_HAND:
                let response = InteractionManager.tryPlayCard(this); 
                if (response.success) {
                    this.setBasePosition(response.newPosition);
                    this.setStatus(CardStatusEnum.IN_FIELD);
                }
        }

        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        this.resetToBasePosition();
    }
    onDragMove() {
        if (this.dragging) {
            let newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            // for some reason switch case here doesn't cause the slot to be updated properly
            if (this.status == CardStatusEnum.IN_HAND)
                InteractionManager.checkCardHoverOverSlots(this, GameStateManager.playerSlots);
            else if (this.status == CardStatusEnum.IN_FIELD)
                InteractionManager.checkCardHoverOverSlots(this, GameStateManager.opponentSlots);
        }
    }
}

