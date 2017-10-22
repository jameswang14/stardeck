// Start the main app logic.
import 'pixi.js'
import Tink from 'lib/Tink' 
import Field from 'app/objects/Field'
import Card from 'app/objects/Card'
import GameStateManager from 'app/GameStateManager'
import CardStatusEnum from 'app/enums/CardStatusEnum'

//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

const WIDTH = 400;
const HEIGHT = 500;

const app = new PIXI.Application();
const stage = app.stage;
// todo: center game
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);
renderer.view.style.position = 'absolute';
renderer.view.style.left = '50%';renderer.view.style.top = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';

var state = pause;
var t = new Tink(PIXI, app.view);
var pointer = t.makePointer();

var playerOneHand = new Container();
var playerTwoHand = new Container();
playerTwoHand.position.set(300, 300);
playerOneHand.position.set(300, 400);
stage.addChild(playerOneHand);
stage.addChild(playerTwoHand)

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.backgroundColor = 0xFFFFFF;
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight); 

loader
  .add("images/zealot-sheet.png")
  .add("images/dark-templar-sheet.png")
  .add("images/marine-sheet.png")
  .add("images/rect.svg")
  .load(setup);

function setup() {
    setupProtoss();
    setupTerran();

    // Add all slots;
    for (var slot of GameStateManager.playerSlots) {
        stage.addChild(slot);
    }
    for (var slot of GameStateManager.opponentSlots) {
        stage.addChild(slot);
    }

    renderer.render(stage);
    state = play;
}

function setupProtoss() {
    var zealotTexture = TextureCache["images/zealot-sheet.png"];
    var darkTemplarTexture = TextureCache["images/dark-templar-sheet.png"];
    var zealotBasePosition = new PIXI.Point(70, 0);
    var darkTemplarBasePosition = new PIXI.Point(0, 0);

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    var rectangle = new Rectangle(2, 2, 38, 40);
    zealotTexture.frame = rectangle;
    var zealot = new Card(zealotTexture, "Zealot", zealotBasePosition);
    
    rectangle = new Rectangle(6, 2, 52, 58);
    darkTemplarTexture.frame = rectangle;
    var darkTemplar = new Card(darkTemplarTexture, "darkTemplar", darkTemplarBasePosition);

    zealot.setStatus(CardStatusEnum.IN_HAND)
    darkTemplar.setStatus(CardStatusEnum.IN_HAND);

    playerOneHand.addChild(zealot);
    playerOneHand.addChild(darkTemplar);
}

function setupTerran() {
    var marineTexture = TextureCache["images/marine-sheet.png"];
    var marineBasePosition = new PIXI.Point(0, 0);

    var rectangle = new Rectangle(192, 12, 20, 28);
    marineTexture.frame = rectangle;
    var marine = new Card(marineTexture, "Marine", marineBasePosition);
    marine.setStatus(CardStatusEnum.IN_HAND)
    playerTwoHand.addChild(marine);
}

function play() {

}

function pause() {

}

function gameLoop() {
  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(stage);
}

//Start the game loop
gameLoop();

