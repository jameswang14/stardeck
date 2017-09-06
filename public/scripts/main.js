// Start the main app logic.
requirejs(
    [
        'lib/pixi.min',
        'lib/Tink',
        'utils/hitTestRectangle',
        'app/objects/Field',
        'app/objects/Card',
        'app/InteractionManager',
        'app/GameStateManager',
    ],
function(PIXI, Tink, hitTestRectangle, Field, Card, InteractionManager, GameStateManager) {
    //Aliases
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Rectangle = PIXI.Rectangle,
        TextureCache = PIXI.utils.TextureCache;

    var state = pause;
    var renderer = autoDetectRenderer(256, 256);

    var t = new Tink(PIXI, renderer.view);
    var pointer = t.makePointer();

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new Container();

    console.log(GameStateManager);

    var playerOneHand = new Container();
    var playerTwoHand = new Container();
    playerTwoHand.position.set(500, 300);
    playerOneHand.position.set(500, 500);
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
      .load(setup);

    // Store references to all interactable objects to detect collisions
    var allInteractableObjects = [];

    function setup() {


        setupProtoss();
        setupTerran();

        //Tell the `renderer` to `render` the `stage`
        renderer.render(stage);
        state = play;
    }

    function setupProtoss() {
        var zealotTexture = TextureCache["images/zealot-sheet.png"];
        var darkTemplarTexture = TextureCache["images/dark-templar-sheet.png"];

        var zealotBasePosition = [0, 0];
        var darkTemplarBasePosition = [70, 0];

        //Create a rectangle object that defines the position and
        //size of the sub-image you want to extract from the texture
        var rectangle = new Rectangle(2, 2, 38, 40);
        zealotTexture.frame = rectangle;
        var zealot = new Card(zealotTexture, "Zealot", zealotBasePosition);
        
        rectangle = new Rectangle(6, 2, 52, 58);
        darkTemplarTexture.frame = rectangle;
        var darkTemplar = new Card(darkTemplarTexture, "darkTemplar", darkTemplarBasePosition);

        playerOneHand.addChild(zealot);
        playerOneHand.addChild(darkTemplar);
    }

    function setupTerran() {
        var marineTexture = TextureCache["images/marine-sheet.png"];
        var marineBasePosition = [0, 0];

        var rectangle = new Rectangle(192, 12, 20, 28);
        marineTexture.frame = rectangle;
        var marine = new Card(marineTexture, "Marine", marineBasePosition);
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

});