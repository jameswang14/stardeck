define(['lib/pixi.min'], function(PIXI) {
	return function(position) {
		class Slot extends PIXI.Container{
			constructor(position) {
				super();
				this.card = null;
				this.isOccupied = false;
				this.position.set(position[0], position[1]);
				this.width = 70;
				this.height = 100;
			}
			addCard(card) {
				if (this.card == null && this.children.length == 0) {
					this.card = card; 
					this.addChild(card);
				}
			}
			removeCard() {
				if (this.card != null && this.children.length > 0) {
					this.card = null;
					this.removeChildren();
				}
			}
		}
	return new Slot(position);
	
	};
});
