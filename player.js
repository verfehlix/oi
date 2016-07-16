function Player(posX, posY, width, height, options){
    var texture = PIXI.loader.resources.playerImage.texture;

    var SpriteObject = function(posX, posY, width, height, options) {
    	// create a new Sprite using the Texture
        var playerSprite;
        if(options && options.tiling){
            playerSprite = new PIXI.extras.TilingSprite(texture);
        } else {
            playerSprite = new PIXI.Sprite(texture);
        }

    	// center the sprite's anchor point
    	playerSprite.anchor.x = 0.5;
    	playerSprite.anchor.y = 0.5;

        // set position
    	playerSprite.position.x = posX;
    	playerSprite.position.y = posY;

        // set size
        playerSprite.width = width;
        playerSprite.height = height;

    	return playerSprite;
    };

    var PhysicsObject = function(posX, posY, width, height, options) {
        var playerPhysicsObject = Matter.Bodies.rectangle(posX, posY, width, height, options);
    	return playerPhysicsObject;
    };

    var setupControls = function(physicsObject) {
        //KEYBOARD INPUT
    	var arrowLeft = keyboard(37);
    	arrowLeft.press = function() {
            Matter.Body.translate(physicsObject, {
                x: -15,
                y: 0
            })
        };
    	arrowLeft.release = function() {};

    	var arrowRight = keyboard(39);
    	arrowRight.press = function() {
            Matter.Body.translate(physicsObject, {
                x: 15,
                y: 0
            })
        };
    	arrowRight.release = function() {};

    	var spacebar = keyboard(32);
    	spacebar.press = function() {
            Matter.Body.applyForce(physicsObject, {
                x : 1,
                y : 1
            }, {
              x : 0,
              y : 0.05
            });
        };
    	spacebar.release = function() {};
    }

    this.sprite = new SpriteObject(posX, posY, width, height, options);
    this.physicsObject = new PhysicsObject(posX, posY, width, height, options);
    setupControls(this.physicsObject);
}
