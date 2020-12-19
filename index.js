let engine = Matter.Engine.create();

let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1600,
    height: 800,
    wireframes: false,
  },
});
let BallArray = [];
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false },
  },
});
render.mouse = mouse;
const bodies = [
  ...[...document.querySelectorAll("#sleigh > path")].map((path) => {
    const body = Matter.Bodies.fromVertices(
      1000,
      80,
      Matter.Svg.pathToVertices(path),
      {
        render: {
          sprite: {
           // texture: "images/white.png",
          },
        },
      },
      true
    );
    Matter.Body.scale(body, 0.2, 0.2);
    return body;
  }),
  ...[...document.querySelectorAll("svg#tree > path")].map((path) => {
    const body = Matter.Bodies.fromVertices(
      100,
      80,
      Matter.Svg.pathToVertices(path),
      {
        render: {
          sprite: {
           // texture: "images/white.png",
          },
        },
      },
      true
    );
    Matter.Body.scale(body, 0.2, 0.2);
    return body;
  }),
];
let platform = Matter.Bodies.rectangle(1200, 500, 300, 20, { isStatic: true });

let stack = Matter.Composites.pyramid(1075, 270, 4, 5, 0, 0, function (x, y) {
  return Matter.Bodies.circle(x, y, 30, {
    render: {
      fillStyle: "white",
      strokeStyle: "white",
      lineWidth: 5,
    },
  });
});
//(xx, yy, columns, rows, columnGap, rowGap, callback)
//let stack = Matter.Composites.car(1300, 270, 300, 20, 100)
let stopper = Matter.Bodies.circle(300, 700, 2, { isStatic: true });
let ball = Matter.Bodies.circle(300, 600, 20); //firing ball
let sling = Matter.Constraint.create({
  pointA: { x: 300, y: 600 },
  bodyB: ball,
  stiffness: 0.05,
}); //sling
let firing = false;
Matter.Events.on(mouseConstraint, "enddrag", function (e) {
  if (e.body === ball) firing = true;
  console.log("fired");
});
Matter.Events.on(engine, "afterUpdate", function () {
  //after every Update
  if (
    firing &&
    Math.abs(ball.position.x - 300) < 20 &&
    Math.abs(ball.position.y - 600) < 20
  ) {
    //if ball was fired and  is behind point
    let ball2 = ball;
    sling.bodyB = stopper;
    setTimeout(function () {
      ball = Matter.Bodies.circle(300, 600, 20);
      Matter.World.add(engine.world, ball);
      sling.bodyB = ball;
    }, 1000);
    setTimeout(function () {
      BallArray.push(ball2);
    }, 3000);
    firing = false;
  }
  for (bAll of BallArray) {
    Matter.Body.scale(bAll, 0.999, 0.999);
    if (bAll.r < 4) {
      Matter.World.remove(engine.world, bAll);
    }
  }
});
Matter.World.add(
  engine.world,
  [stack, platform, mouseConstraint, ball, sling, stopper].concat(bodies)
);
Matter.Engine.run(engine);
Matter.Render.run(render);
console.log(bodies);
document.getElementById("Loading").innerHTML = "";
