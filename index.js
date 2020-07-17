// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(160, 50, 80, 800);
var boxB = Bodies.polygon(500, 500, 6, 25)
var boxc = Bodies.rectangle(160, 50, 80, 80);
var c1= Bodies.circle(160,50,20)
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxc,c1, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);