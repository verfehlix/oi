window.onload = init;

function init() {
	//SETTINGS
	var width = 640;
	var height = 760;

	//ALIASES
	var Container = PIXI.Container,
		autoDetectRenderer = PIXI.autoDetectRenderer,
		loader = PIXI.loader,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite;

	//RENDERER & STAGE
	var renderer = PIXI.autoDetectRenderer(width, height),
		stage = new PIXI.Container();
	document.body.appendChild(renderer.view);

	//KEYBOARD INPUT
	var arrowLeft = keyboard(37);
	arrowLeft.press = function() {
		cat.vx = -1;
	};
	arrowLeft.release = function() {
		if (!arrowRight.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	};

	var arrowRight = keyboard(39);
	arrowRight.press = function() {
		cat.vx = 1;
	};
	arrowRight.release = function() {
		if (!arrowLeft.isDown && cat.vy === 0) {
			cat.vx = 0;
		}
	};

	var spacebar = keyboard(32);
	spacebar.press = function() {
		cat.vy = -2;
	};
	spacebar.release = function() {
		cat.vy = 0;
	};

	var enter = keyboard(13);
	enter.press = function() {
		if(gameState === intro){
			gameState = game;
		}
	};
	enter.release = function() {};

	//IMAGE LOADING
	loader
		.add("catImage", "img/cat.png")
		.load(setup);


	//sprites, etc.
	var gameState, message, cat;

	var introInitHasBeenCalled = false;
	var gameInitHasBeenCalled = false;

	function setupCat() {
		cat = new Sprite(
			PIXI.loader.resources.catImage.texture
		);

		cat.x = 100;
		cat.y = 200;

		cat.anchor.set(0.5, 0.5);
		cat.rotation = 0.25;

		cat.vx = 0;
		cat.vy = 0;

		cat.move = function() {
			this.x += this.vx;
			this.y += this.vy;
		}
		cat.vx = 0;
		cat.vy = 0;

		stage.addChild(cat);
	};

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
			setupCat();
			gameInitHasBeenCalled = true;
		}

		cat.move();
	};
}
