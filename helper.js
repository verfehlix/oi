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
};
