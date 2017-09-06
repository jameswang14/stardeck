define(['lib/pixi.min', 'app/InteractionManager'], function(PIXI, InteractionManager) {
    return function(texture, name, basePosition) {
        class Card extends PIXI.Sprite {
            constructor(texture, name, basePosition) {
                super(texture);
                this.position.set(basePosition[0], basePosition[1]);
                // this will allow it to respond to mouse and touch events
                this.interactive = true;
                this.buttonMode = true;
                this.anchor.set(0.5);

                this.basePosition = basePosition;

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

            resetToBasePosition() {
                this.position.set(basePosition[0], basePosition[1]);
            }
            onDragStart(event) {
                // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch
                this.data = event.data;
                this.dragging = true;
            }
            onDragEnd() {
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
                InteractionManager.checkCanPlayCard(this);
                this.resetToBasePosition();
            }
            onDragMove()
            {
                if (this.dragging)
                {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.position.x = newPosition.x;
                    this.position.y = newPosition.y;
                }
            }
        }
        return new Card(texture, name, basePosition);
    };
});

