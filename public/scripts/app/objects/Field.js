import 'pixi.js'
import InteractionManager from 'app/InteractionManager'

export default class Field extends PIXI.Container{
	constructor(cards, position=[500,500]) {
		super();
		this.spots = [];
		this.cards = cards;
		this.position.set(position[0], position[1]);
		this.spotWidth = 70;
	}
}
