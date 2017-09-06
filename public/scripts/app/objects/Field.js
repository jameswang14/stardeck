define(['lib/pixi.min', 'app/InteractionManager'], function(PIXI, InteractionManager) {
	return function(cards, position) {
		class Field extends PIXI.Container{
			constructor(cards, position=[500,500]) {
				super();
				this.spots = [];
				this.cards = cards;
				this.position.set(position[0], position[1]);
				this.spotWidth = 70;
			}
		}
	return new Field(cards, position);
	
	};
});
