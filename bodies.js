function Box(posX, posY, width, height, options){
    var texture = PIXI.loader.resources.boxImage.texture;

    var SpriteObject = function(posX, posY, width, height, options) {
    	// create a new Sprite using the Texture
        var boxSprite;
        if(options && options.tiling){
            boxSprite = new PIXI.extras.TilingSprite(texture);
        } else {
            boxSprite = new PIXI.Sprite(texture);
        }

    	// center the sprite's anchor point
    	boxSprite.anchor.x = 0.5;
    	boxSprite.anchor.y = 0.5;

        // set position
    	boxSprite.position.x = posX;
    	boxSprite.position.y = posY;

        // set size
        boxSprite.width = width;
        boxSprite.height = height;

    	return boxSprite;
    };

    var PhysicsObject = function(posX, posY, width, height, options) {
        var boxPhysicsObject = Matter.Bodies.rectangle(posX, posY, width, height, options);
    	return boxPhysicsObject;
    };

    this.sprite = new SpriteObject(posX, posY, width, height, options);
    this.physicsObject = new PhysicsObject(posX, posY, width, height, options);
}

function Wall(posX, posY, width, height, options){
    var texture = PIXI.loader.resources.wallImage.texture;

    var SpriteObject = function(posX, posY, width, height, options) {
    	// create a new Sprite using the Texture
        var wallSprite = new PIXI.extras.TilingSprite(texture);

    	// center the sprite's anchor point
    	wallSprite.anchor.x = 0.5;
    	wallSprite.anchor.y = 0.5;

        // set position
    	wallSprite.position.x = posX;
    	wallSprite.position.y = posY;

        // set size
        wallSprite.width = width;
        wallSprite.height = height;

    	return wallSprite;
    };

    var PhysicsObject = function(posX, posY, width, height, options) {
        var wallPhysicsObject = Matter.Bodies.rectangle(posX, posY, width, height, options);
    	return wallPhysicsObject;
    };

    this.sprite = new SpriteObject(posX, posY, width, height, options);
    this.physicsObject = new PhysicsObject(posX, posY, width, height, options);
}
