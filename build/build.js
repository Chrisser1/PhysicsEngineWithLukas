var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var simulation;
var sketch = function (p) {
    p.setup = function () {
        var width = 500;
        var height = 500;
        p.createCanvas(width, height);
        p.frameRate(60);
        simulation = new Simulation(width, height);
        for (var i = 0; i < 100; i++) {
            simulation.addBall(10);
        }
    };
    p.draw = function () {
        p.background(220);
        simulation.render();
    };
};
function setup() {
    var width = 500;
    var height = 500;
    createCanvas(width, height);
    frameRate(60);
    simulation = new Simulation(width, height);
    for (var i = 0; i < 100; i++) {
        simulation.addBall(10);
    }
}
function draw() {
    background(220);
    simulation.update();
    simulation.render();
}
var Simulation = (function () {
    function Simulation(width, height) {
        this.balls = [];
        this.width = width;
        this.height = height;
        this.balls = [];
    }
    Simulation.prototype.addBall = function (radius) {
        var diameter = radius * 2;
        var minX = diameter;
        var minY = diameter;
        var maxX = this.width - diameter;
        var maxY = this.height - diameter;
        var x = Math.random() * (maxX - minX) + minX;
        var y = Math.random() * (maxY - minY) + minY;
        var direction = Math.random() * Math.PI * 2;
        var ballSpeed = 1;
        this.balls.push(new Ball(x, y, radius, direction, ballSpeed));
    };
    Simulation.prototype.update = function () {
        this.balls.forEach(function (ball) {
            ball.move();
        });
        simulation.checkForCollisionsIndexed();
        simulation.testForWalls();
    };
    Simulation.prototype.testForWalls = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            if (ball.x + ball.radius > this.width) {
                ball.dx *= -1;
                ball.x = this.width - ball.radius;
                continue;
            }
            if (ball.x - ball.radius < 0) {
                ball.dx *= -1;
                ball.x = ball.radius;
                continue;
            }
            if (ball.y + ball.radius > this.height) {
                ball.dy *= -1;
                ball.y = this.height - ball.radius;
                continue;
            }
            if (ball.y - ball.radius < 0) {
                ball.dy *= -1;
                ball.y = ball.radius;
            }
        }
    };
    Simulation.prototype.checkForCollisionsIndexed = function () {
        var index = new Flatbush(this.balls.length);
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            index.add(ball.bbox[0], ball.bbox[1], ball.bbox[2], ball.bbox[3]);
        }
        index.finish();
        for (var _b = 0, _c = this.balls; _b < _c.length; _b++) {
            var first = _c[_b];
            var collisions = index.search(first.bbox[0], first.bbox[1], first.bbox[2], first.bbox[3]);
            for (var _d = 0, collisions_1 = collisions; _d < collisions_1.length; _d++) {
                var idx = collisions_1[_d];
                var second_1 = this.balls[idx];
                if (first === second_1)
                    continue;
                if (first.isCollidingWith(second_1)) {
                    this.collide(first, second_1);
                }
            }
        }
    };
    Simulation.prototype.checkForCollisions = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var first = _a[_i];
            for (var _b = 0, _c = this.balls; _b < _c.length; _b++) {
                var second_2 = _c[_b];
                if (first === second_2)
                    continue;
                if (first.isCollidingWith(second_2)) {
                    this.collide(first, second_2);
                }
            }
        }
    };
    Simulation.prototype.collide = function (first, second) {
        var dx = first.x - second.x;
        var dy = first.y - second.y;
        var vx = second.dx - first.dx;
        var vy = second.dy - first.dy;
        var dot = dx * vx + dy * vy;
        if (dot > 0) {
            var cr = first.mass + second.mass;
            var dr = first.mass - second.mass;
            var vx1 = (first.dx * dr + 2 * second.mass * second.dx) / cr;
            var vy1 = (first.dy * dr + 2 * second.mass * second.dy) / cr;
            var vx2 = (second.dx * -dr + 2 * first.mass * first.dx) / cr;
            var vy2 = (second.dy * -dr + 2 * first.mass * first.dy) / cr;
            first.dx = vx1;
            first.dy = vy1;
            second.dx = vx2;
            second.dy = vy2;
            first.move();
            second.move();
        }
    };
    Simulation.prototype.render = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            circle(ball.x, ball.y, ball.radius);
        }
    };
    return Simulation;
}());
var Ball = (function () {
    function Ball(x, y, radius, direction, ballSpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = radius;
        this.direction = direction;
        this.speed = ballSpeed;
        this.dx = this.speed * Math.cos(this.direction);
        this.dy = this.speed * Math.sin(this.direction);
    }
    Ball.prototype.move = function () {
        this.x += this.speed;
        this.y += this.speed;
    };
    Ball.prototype.isCollidingWith = function (ball) {
        var dx = this.x - ball.x;
        var dy = this.y - ball.y;
        var dr = this.radius + ball.radius;
        var squaredDistance = Math.pow(dx, 2) + Math.pow(dy, 2);
        return squaredDistance < Math.pow(dr, 2);
    };
    Object.defineProperty(Ball.prototype, "bbox", {
        get: function () {
            return [this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius];
        },
        enumerable: false,
        configurable: true
    });
    return Ball;
}());
//# sourceMappingURL=build.js.map