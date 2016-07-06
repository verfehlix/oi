window.onload = init;
function init() {
	//ALIASES
	var Container = PIXI.Container, autoDetectRenderer = PIXI.autoDetectRenderer,
		loader = PIXI.loader, resources = PIXI.loader.resources, Sprite = PIXI.Sprite;

	//RENDERER & STAGE
	var renderer = PIXI.autoDetectRenderer(640, 760),
		stage = new PIXI.Container();
	document.body.appendChild(renderer.view);

	//KEYBOARD INPUT
	var arrowLeft = keyboard(37);
	arrowLeft.press = function() {
		cat.vx = -1;
	};
	arrowLeft.release = function() {
		if(!arrowRight.isDown && cat.vy === 0){
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

	//IMAGE LOADING
	loader
  .add("catImage","img/cat.png")
  .load(setup);

	//sprites, etc.
	var cat, message;

	function setup() {
		cat = new Sprite(
			PIXI.loader.resources.catImage.texture
		);

		message = new PIXI.Text(
		  "Jump!",
		  {font: "25px sans-serif", fill: "white"}
		);
		message.position.set(10, 10);
		stage.addChild(message);

		cat.x = 100;
		cat.y = 200;

		cat.anchor.set(0.5,0.5);
		cat.rotation = 0.25;

		cat.vx = 0;
		cat.vy = 0;

		cat.move = function(){
			this.x += this.vx;
			this.y += this.vy;
		}
		cat.vx = 0;
		cat.vy = 0;

		stage.addChild(cat);

		gameLoop();
	};

	//GAME LOOP
	function gameLoop() {

	  //Loop this function at 60 frames per second
	  requestAnimationFrame(gameLoop);

	  //Move the cat 1 pixel to the right each frame
	  cat.move();

	  //Render the stage to see the animation
	  renderer.render(stage);
	}
}
