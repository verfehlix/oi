function Box(){
    var texture = PIXI.loader.resources.boxImage.texture;

    function SpriteObject(posX, posY, width, height, options) {
    	// create a new Sprite using the texture
    	var boxSprite = new PIXI.Sprite(texture);

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

    function PhysicsObject(posX, posY, width, height, options) {
        var boxPhysicsObject = Bodies.rectangle(posX, posY, width, height, options);

    	return boxPhysicsObject;
    };

    var create = function(posX, posY, width, height, options) {
    	return {
    		sprite: new SpriteObject(posX, posY, width, height, options),
    		boxPhysicsObject: new PhysicsObject(posX, posY, width, height, options)
    	};
    };
}
