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

	var boxCollisionSound = new Howl({
		src: ['sound/boxCollision.wav']
	});

	var playedCollisions = [];

	Matter.Events.on(engine, 'collisionStart', function(event) {
		var pairs = event.pairs;

		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var namePair = {
				a: pair.bodyA.label,
				b: pair.bodyB.label
			};

			var alreadyPlayed = false;

			for (var i = 0; i < playedCollisions.length; i++) {
				if(playedCollisions[i].a === pair.bodyA.label && playedCollisions[i].b === pair.bodyB.label){
					alreadyPlayed = true;
				}
			}

			if(!alreadyPlayed){
				boxCollisionSound.play();

				playedCollisions.push(namePair);
			} else {
				console.log('boo');
			}
		}
	});

	//SETUP
	function setup() {
		gameState = intro;
		gameState = game;

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

			var ground = new Box(320, 730, 640, 60, { isStatic: true, tiling: true, label: 'Ground' });
			helper.addBody(ground);

			// var boxA = new Box(200, 200, 80, 80);
			// helper.addBody(boxA);
			//
			// var boxB = new Box(450, 50, 80, 80);
			// helper.addBody(boxB);


			for (var i = 0; i < 7; i++) {
				var x = Math.floor(Math.random() * width - 200) + 100
				var y = Math.floor(Math.random() * height - 200) + 100
				var w = Math.floor(Math.random() * 100) + 50
				var h = w
				var boxA = new Box(x,y,w,h, {label: 'Box' + i});
				helper.addBody(boxA);
			}

			Engine.run(engine);

			gameInitHasBeenCalled = true;
		}

		for(var b in bodies) {
			bodies[b].sprite.position = bodies[b].boxPhysicsObject.position;
			bodies[b].sprite.rotation = bodies[b].boxPhysicsObject.angle;
		}
	};
}
