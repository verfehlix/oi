window.onload = init;

function init() {
	//SETTINGS
	var width = 640;
	var height = 760;

	//ALIASES
	//pixi js
	var Container = PIXI.Container,
		autoDetectRenderer = PIXI.autoDetectRenderer,
		loader = PIXI.loader,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite;
	//matter js
	var Engine = Matter.Engine,
	    World = Matter.World,
	    Bodies = Matter.Bodies;

	//pixi js RENDERER & STAGE
	var renderer = PIXI.autoDetectRenderer(width, height),
		stage = new PIXI.Container();
	document.body.appendChild(renderer.view);

	//matter js ENGINE
	var engine = Engine.create();

	//KEYBOARD INPUT
	var arrowLeft = keyboard(37);
	arrowLeft.press = function() {};
	arrowLeft.release = function() {};

	var arrowRight = keyboard(39);
	arrowRight.press = function() {};
	arrowRight.release = function() {};

	var spacebar = keyboard(32);
	spacebar.press = function() {};
	spacebar.release = function() {};

	var enter = keyboard(13);
	enter.press = function() {
		if(gameState === intro){
			gameState = game;
		}
	};
	enter.release = function() {};

	//IMAGE LOADING
	loader
		.add("boxImage", "img/box.png")
		.load(setup);


	//sprites, etc.
	var gameState, message;
	var bodies = [];

	var helper = new Helper(stage, bodies, World, engine);

	var introInitHasBeenCalled = false;
	var gameInitHasBeenCalled = false;

	//SETUP
	function setup() {
		gameState = intro;

		gameLoop();
	};

	//GAME LOOP
	function gameLoop() {

		//Loop this function at 60 frames per second
		requestAnimationFrame(gameLoop);

		gameState();

		//Render the stage to see the animation
		renderer.render(stage);
	}

	var intro = function() {
		if(!introInitHasBeenCalled){
			message = new PIXI.Text(
				"   READY PLAYER ONE \n Press Enter to Start", {
					font: "25px Source Code Pro",
					fill: "white"
				}
			);
			message.position.set(width/2-160, height/2-20);
			stage.addChild(message);

			introInitHasBeenCalled = true;
		}
	};

	var game = function() {
		if(!gameInitHasBeenCalled){
			stage.removeChild(message);

			var ground = new Box(320, 730, 640, 60, { isStatic: true, tiling: true });
			helper.addBody(ground);

			var boxA = new Box(200, 200, 80, 80);
			helper.addBody(boxA);

			var boxB = new Box(450, 50, 80, 80);
			helper.addBody(boxB);

			Engine.run(engine);

			gameInitHasBeenCalled = true;
		}

		for(var b in bodies) {
			bodies[b].sprite.position = bodies[b].boxPhysicsObject.position;
			bodies[b].sprite.rotation = bodies[b].boxPhysicsObject.angle;
		}
	};
}
