let simulation: Simulation;

let sketch = (p: p5) => {
  p.setup = () => {
    let width = 500;
    let height = 500;
    p.createCanvas(width, height);
    p.frameRate(60);
    simulation = new Simulation(width, height);
    for (let i = 0; i < 100; i++) {
      simulation.addBall(10);
    }
  };

  p.draw = () => {
    p.background(220);
    simulation.render();
  };
};

function setup() {
  let width = 500;
  let height = 500;
  createCanvas(width, height);
  frameRate(60);
  simulation = new Simulation(width, height);
  for (let i = 0; i < 100; i++) {
    simulation.addBall(10);
  }
}

function draw() {
  background(220);
  simulation.update();
  simulation.render();
}
class Simulation {
  width: number;
  height: number;
  balls: Ball[] = [];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.balls = [];
  }

  addBall(radius: number) {
    let diameter = radius * 2;

    let minX = diameter;
    let minY = diameter;
    let maxX = this.width - diameter;
    let maxY = this.height - diameter;

    let x = Math.random() * (maxX - minX) + minX;
    let y = Math.random() * (maxY - minY) + minY;
    let direction = Math.random() * Math.PI * 2;
    let ballSpeed = 1;

    this.balls.push(new Ball(x, y, radius, direction, ballSpeed));
  }

  update() {
    this.balls.forEach((ball) => {
      ball.move();
    });
    simulation.checkForCollisionsIndexed();
    simulation.testForWalls();
  }

  testForWalls() {
    for (let ball of this.balls) {
      // too far right
      if (ball.x + ball.radius > this.width) {
        ball.dx *= -1;
        ball.x = this.width - ball.radius;
        continue;
      }

      // too far left
      if (ball.x - ball.radius < 0) {
        ball.dx *= -1;
        ball.x = ball.radius;
        continue;
      }

      // too far down
      if (ball.y + ball.radius > this.height) {
        ball.dy *= -1;
        ball.y = this.height - ball.radius;
        continue;
      }

      // too far up
      if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
        ball.y = ball.radius;
      }
    }
  }

  checkForCollisionsIndexed() {
    // create our new index
    let index = new Flatbush(this.balls.length);

    // add them
    for (const ball of this.balls) {
      index.add(ball.bbox[0], ball.bbox[1], ball.bbox[2], ball.bbox[3]);
    }

    // prep the index
    index.finish();

    for (const first of this.balls) {
      const collisions = index.search(first.bbox[0], first.bbox[1], first.bbox[2], first.bbox[3]);

      for (const idx of collisions) {
        const second = this.balls[idx];

        if (first === second) continue;

        if (first.isCollidingWith(second)) {
          this.collide(first, second);
        }
      }
    }
  }

  checkForCollisions() {
    // this could be much more efficient, but you need ~1,000+ balls for it
    // to start to matter, so I kept it simple
    for (const first of this.balls) {
      for (const second of this.balls) {
        // skip if same ball
        if (first === second) continue;
        if (first.isCollidingWith(second)) {
          this.collide(first, second);
        }
      }
    }
  }

  collide(first: Ball, second: Ball) {
    // first we determine if they're moving toward each other
    // this allows overlaps going in opposite directions to "resolve"
    // and not stick to each other
    const dx = first.x - second.x;
    const dy = first.y - second.y;
    const vx = second.dx - first.dx;
    const vy = second.dy - first.dy;
    const dot = dx * vx + dy * vy;

    // if going toward each other, bounce 'em
    if (dot > 0) {
      const cr = first.mass + second.mass;
      const dr = first.mass - second.mass;

      // determine our new velocities
      const vx1 = (first.dx * dr + 2 * second.mass * second.dx) / cr;
      const vy1 = (first.dy * dr + 2 * second.mass * second.dy) / cr;
      const vx2 = (second.dx * -dr + 2 * first.mass * first.dx) / cr;
      const vy2 = (second.dy * -dr + 2 * first.mass * first.dy) / cr;

      // set them
      first.dx = vx1;
      first.dy = vy1;
      second.dx = vx2;
      second.dy = vy2;

      // trigger a move for both so they stop overlapping immediately
      first.move();
      second.move();
    }
  }
  render() {
    for (const ball of this.balls) {
      circle(ball.x, ball.y, ball.radius);
    }
  }
}
class Ball {
  x: number;
  y: number;
  radius: number;
  mass: number;
  direction: number;
  speed: number;
  dx: number;
  dy: number;
  constructor(x: number, y: number, radius: number, direction: number, ballSpeed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = radius;
    this.direction = direction;
    this.speed = ballSpeed;
    this.dx = this.speed * Math.cos(this.direction);
    this.dy = this.speed * Math.sin(this.direction);
  }

  move() {
    this.x += this.speed;
    this.y += this.speed;
  }

  isCollidingWith(ball: Ball) {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const dr = this.radius + ball.radius;
    // don't use the square root because it's 1) slower, and 2) not needed for collision detection
    const squaredDistance = Math.pow(dx, 2) + Math.pow(dy, 2);

    return squaredDistance < Math.pow(dr, 2);
  }

  get bbox() {
    return [this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius];
  }
}
