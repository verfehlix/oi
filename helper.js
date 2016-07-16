function Helper(stage, bodies, World, engine){
    this.stage = stage;
    this.bodies = bodies;
    this.World = World;
    this.engine = engine;

    this.addBody = function(body){
        this.stage.addChild(body.sprite);
        this.bodies.push(body)
        this.World.add(this.engine.world,body.physicsObject);
    }

    this.addRandomBoxes = function(width, height, amount){
        var helper = this;
        for (var i = 0; i < amount; i++) {
            var x = Math.floor(Math.random() * width - 200) + 200;
            var y = Math.floor(Math.random() * height - 200) + 200;
            var size = Math.floor(Math.random() * 75) + 50;
            var boxA = new Box(x,y,size,size, {label: 'Box' + i});
            helper.addBody(boxA);
        }
    }
};
