import 'pixi.js'
import InteractionManager from 'app/InteractionManager'
import GameStateManager from 'app/GameStateManager'
import CardStatusEnum from 'app/enums/CardStatusEnum'

export default class Card extends PIXI.Sprite {
    constructor(texture, name, atk, cost, hp, basePosition) {
        super(texture);
        this.name = name;
        this.atk = atk;
        this.cost = cost;
        this.hp = hp;
        this.basePosition = basePosition;
        this.resetToBasePosition();

        // this will allow it to respond to mouse and touch events
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);

        this.status = CardStatusEnum.IN_DECK;

        this.initializeStats();

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
    initializeStats() {
        let TEXT_PADDING = 20;
        let startX = -30;
        let startY = 30;
        var style = new PIXI.TextStyle({
             fontSize: 12
        });
        var atkText = new PIXI.Text(this.atk, style);
        atkText.x = startX;
        atkText.y = startY;
        this.addChild(atkText);
        startX += TEXT_PADDING;

        var costText = new PIXI.Text(this.cost, style);
        costText.x = startX;
        costText.y = startY;
        this.addChild(costText);
        startX += TEXT_PADDING;

        var hpText = new PIXI.Text(this.hp, style);
        hpText.x = startX;
        hpText.y = startY;
        this.addChild(hpText);
        startX += TEXT_PADDING;
        
    }
    setBasePosition(position) {
        this.basePosition = position;
    }
    resetToBasePosition() {
        this.position = this.basePosition;
        this.interactive = true;
    }
    setStatus(status) {
        this.status = status;
    }
    onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
    }
    onDragEnd() {
        let response = null;
        switch(this.status) {
            case CardStatusEnum.IN_HAND:
                response = InteractionManager.tryPlayCard(this); 
                if (response.success) {
                    this.setBasePosition(response.newPosition);
                    this.setStatus(CardStatusEnum.IN_FIELD);
                }
            case CardStatusEnum.IN_FIELD:
                response = InteractionManager.tryAttackCard(this);
                if (response.success) {
                    console.log("attacked");
                    
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

