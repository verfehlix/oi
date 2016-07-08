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

	//MATTER JS ENGINE
	var engine = Engine.create();

	//RENDERER & STAGE
	var renderer = PIXI.autoDetectRenderer(width, height),
		stage = new PIXI.Container();
	document.body.appendChild(renderer.view);

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
		.add("boxImage", "img/cat.png")
		.load(setup);


	//sprites, etc.
	var gameState, message;
	var bodies = [];
	var boxes = [];

	var introInitHasBeenCalled = false;
	var gameInitHasBeenCalled = false;

	function Box() {
		var box = new Sprite(
			PIXI.loader.resources.boxImage.texture
		);

		box.x = 100;
		box.y = 200;

		box.anchor.set(0.5, 0.5);
		// box.rotation = 0.25;

		// box.move = function() {
		// 	this.x += this.vx;
		// 	this.y += this.vy;
		// }
		// box.vx = 0;
		// box.vy = 0;

		stage.addChild(box);

		return box;
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

			// create two boxes and a ground
			boxA = Bodies.rectangle(200, 200, 80, 80);
			boxB = Bodies.rectangle(450, 50, 80, 80);
			ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
			bodies.push(boxA);
			bodies.push(boxB);
			bodies.push(ground);

			World.add(engine.world,[boxA, boxB, ground]);

			boxes.push({
				sprite: new Box(),
				body: boxA
			});

			boxes.push({
				sprite: new Box(),
				body: boxB
			});

			boxes.push({
				sprite: new Box(),
				body: ground
			});

			//add them to the world
			World.add(engine.world, [boxA, boxB, ground]);

			Engine.run(engine);

			gameInitHasBeenCalled = true;
		}

		for(var b in boxes) {
			boxes[b].sprite.position = boxes[b].body.position;
			boxes[b].sprite.rotation = boxes[b].body.angle;
		}
	};
}
