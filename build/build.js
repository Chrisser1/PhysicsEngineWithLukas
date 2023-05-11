var ObjectsManager = (function () {
    function ObjectsManager() {
        this.objects = [];
    }
    ObjectsManager.prototype.preview = function (width, height, diameter, type) {
        switch (type) {
            case objectTypes.Rect:
                rect(mouseX, mouseY, width, height);
                break;
            case objectTypes.Circle:
                circle(mouseX, mouseY, diameter);
                break;
            default:
                console.error("Error there is no type");
        }
    };
    ObjectsManager.prototype.createObject = function (rectWidth, rectHeight, diameter, type, isStatic) {
        if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
            return;
        }
        switch (type) {
            case objectTypes.Rect:
                this.objects.push(new Rect(mouseX, mouseY, rectWidth, rectHeight, type, isStatic));
                break;
            case objectTypes.Circle:
                this.objects.push(new Circle(mouseX, mouseY, diameter, type, isStatic));
                break;
            default:
                console.error("Error there is no type");
        }
    };
    ObjectsManager.prototype.drawObjects = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    };
    ObjectsManager.prototype.deleteObject = function (xPosition, yPosition, objects) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].collisionWithMouse()) {
                this.objects.splice(i, 1);
            }
        }
    };
    ObjectsManager.prototype.addGravity = function () {
        this.objects.forEach(function (object) {
            if (object.isStatic === false) {
                object.speed.y += 9.82e-2;
            }
        });
    };
    ObjectsManager.prototype.updateObjectsPos = function () {
        this.objects.forEach(function (object) {
            object.updatePos();
        });
    };
    ObjectsManager.prototype.chooseCollisionCheck = function (object1, object2) {
        var colliding;
        switch ((object1.type, object2.type)) {
            case objectTypes.Rect && objectTypes.Rect:
                colliding = rectangleRectangle(object1, object2);
                break;
            case objectTypes.Rect && objectTypes.Circle:
                colliding = circleRectangle(object1, object2);
                break;
            case objectTypes.Circle && objectTypes.Rect:
                colliding = circleRectangle(object1, object2);
                break;
            case objectTypes.Circle && objectTypes.Circle:
                colliding = circleCircle(object1, object2);
                break;
            default:
                console.error("Error there is no type");
        }
    };
    ObjectsManager.prototype.checkCollisionBetweenObjects = function () {
        var _this = this;
        this.objects.forEach(function (object, i) {
            var tempObjectArray = _this.objects.concat();
            tempObjectArray.splice(i, 1);
            tempObjectArray.forEach(function (secondObject) { });
        });
    };
    ObjectsManager.prototype.tick = function () {
        this.addGravity();
        this.updateObjectsPos();
        this.drawObjects();
    };
    return ObjectsManager;
}());
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
    };
    return Vector;
}());
function pointRect(point, rect) {
    if (point.x >= rect.position.x &&
        point.x <= rect.position.x + rect.width &&
        point.y >= rect.position.y &&
        point.y <= rect.position.y + rect.height) {
        return true;
    }
    return false;
}
function pointCircle(point, circle) {
    var distX = point.x - circle.position.x;
    var distY = point.y - circle.position.y;
    var distance = sqrt(distX * distX + distY * distY);
    if (distance <= circle.radius) {
        return true;
    }
    return false;
}
function circleRectangle(circle, rect) {
    var testX;
    var testY;
    if (circle.position.x < rect.position.x) {
        testX = rect.position.x;
    }
    else if (circle.position.x > rect.position.x + rect.width) {
        testX = rect.position.x + rect.width;
    }
    if (circle.position.y < rect.position.y) {
        testY = rect.position.y;
    }
    else if (circle.position.y > rect.position.y) {
        testY = +rect.height;
    }
    var distX = circle.position.x - testX;
    var distY = circle.position.y - testY;
    var distance = sqrt(distX * distX + distY * distY);
    if (distance <= circle.radius) {
        return true;
    }
    return false;
}
function linePoint(line, point) {
    var d1 = dist(point.x, point.y, line.position.x, line.position.y);
    var d2 = dist(point.x, point.y, line.position2.x, line.position2.y);
    var lineLen = dist(line.position.x, line.position.y, line.position2.x, line.position2.y);
    var buffer = 0.1;
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
        return true;
    }
    return false;
}
function lineCircle(line, circle) {
    var inside1 = pointCircle(line.position, circle);
    var inside2 = pointCircle(line.position2, circle);
    if (inside1 || inside2) {
        return true;
    }
    var distX = line.position.x - line.position2.x;
    var distY = line.position.y - line.position2.y;
    var len = sqrt(distX * distX + distY * distY);
    var dot = ((circle.position.x - line.position.x) * (line.position2.x - line.position.x) + (circle.position.y - line.position.y) * (line.position2.y - line.position.y)) / pow(len, 2);
    var closestX = line.position.x + dot * (line.position2.x - line.position.x);
    var closestY = line.position.y + dot * (line.position2.y - line.position.y);
    var onSegment = linePoint(line, circle.position);
    if (onSegment === false)
        return false;
    distX = closestX - circle.position.x;
    distY = closestY - circle.position.y;
    var distance = Math.sqrt(distX * distX + distY * distY);
    if (distance <= circle.radius) {
        return true;
    }
    return false;
}
function LineLine(line1, line2) {
    var x1 = line1.position.x;
    var x2 = line1.position2.x;
    var x3 = line2.position.x;
    var x4 = line2.position2.x;
    var y1 = line1.position.y;
    var y2 = line1.position2.y;
    var y3 = line2.position.y;
    var y4 = line2.position2.y;
    var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}
function circleCircle(circle1, circle2) {
    var distX = circle1.position.x - circle2.position.x;
    var distY = circle1.position.y - circle2.position.y;
    var distance = sqrt(distX * distX + distY * distY);
    if (distance <= circle1.radius + circle2.radius) {
        return true;
    }
    return false;
}
function rectangleRectangle(rect1, rect2) {
    if (rect1.position.x + rect2.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height) {
        return true;
    }
    return false;
}
var objects;
var objectWidth;
var objectHeight;
var objectDiameter;
var sliderWidth;
var sliderHeight;
var sliderDiameter;
var type;
var static;
var bulldozerMode;
function setup() {
    objects = new ObjectsManager();
    var cnv = createCanvas(900, 500);
    cnv.position((windowWidth - width) / 2);
    sliderWidth = document.getElementById("sliderWidth");
    sliderHeight = document.getElementById("sliderHeight");
    sliderDiameter = document.getElementById("sliderDiameter");
}
function draw() {
    background(225);
    objects.tick();
    var ObjectType = document.getElementById("type");
    if (ObjectType.checked) {
        type = objectTypes.Circle;
    }
    else {
        type = objectTypes.Rect;
    }
    var objectDelete = document.getElementById("delete");
    bulldozerMode = objectDelete.checked;
    var objectIsStatic = document.getElementById("static");
    static = objectIsStatic.checked;
    if (bulldozerMode === false) {
        objectWidth = Number(sliderWidth.value);
        objectHeight = Number(sliderHeight.value);
        objectDiameter = Number(sliderDiameter.value);
        objects.preview(objectWidth, objectHeight, objectDiameter, type);
    }
}
function mouseClicked(event) {
    if (bulldozerMode) {
        objects.deleteObject(mouseX, mouseY, type);
    }
    else {
        objects.createObject(objectWidth, objectHeight, objectDiameter, type, static);
    }
}
var objectTypes;
(function (objectTypes) {
    objectTypes[objectTypes["Rect"] = 0] = "Rect";
    objectTypes[objectTypes["Circle"] = 1] = "Circle";
    objectTypes[objectTypes["Line"] = 2] = "Line";
})(objectTypes || (objectTypes = {}));
function closestPointOnLine(line, point) {
    var A1 = line.position2.y - line.position.y;
    var B1 = line.position.x - line.position2.x;
    var C1 = A1 * line.position.x + B1 * line.position.y;
    var C2 = -B1 * point.x + A1 * point.y;
    var determinant = A1 * A1 - -B1 * B1;
    var cx = 0;
    var cy = 0;
    if (determinant != 0) {
        cx = (A1 * C1 - B1 * C2) / determinant;
        cy = (A1 * C2 - -B1 * C1) / determinant;
    }
    else {
        cx = point.x;
        cy = point.y;
    }
    return new Vector(cx, cy);
}
function moveIntersectingCircles(circle1, circle2) {
    var midPointX = (circle1.position.x + circle2.position.x) / 2;
    var midPointY = (circle1.position.y + circle2.position.y) / 2;
}
var Objects = (function () {
    function Objects(x, y, type, isStatic) {
        this.position = new Vector(x, y);
        this.speed = new Vector(0, 0);
        this.type = type;
        this.isStatic = isStatic;
    }
    Objects.prototype.updatePos = function () {
        this.position.add(this.speed);
    };
    return Objects;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(mouseX, mouseY, diameter, type, isStatic) {
        var _this = _super.call(this, mouseX, mouseY, type, isStatic) || this;
        _this.diameter = diameter;
        _this.radius = diameter / 2;
        return _this;
    }
    Circle.prototype.draw = function () {
        circle(this.position.x, this.position.y, this.diameter);
    };
    Circle.prototype.collisionWithMouse = function () {
        return pointCircle(new Vector(mouseX, mouseY), this);
    };
    Circle.prototype.collisionWithObject = function () {
        throw new Error("Method not implemented.");
    };
    return Circle;
}(Objects));
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(x1, y1, y2, x2, isStatic, position2) {
        var _this = _super.call(this, x1, y1, objectTypes.Line, isStatic) || this;
        _this.position2 = new Vector(x2, y2);
        return _this;
    }
    Line.prototype.draw = function () {
        line(this.position.x, this.position.y, this.position2.x, this.position2.y);
    };
    Line.prototype.collisionWithMouse = function () {
        throw new Error("Method not implemented.");
    };
    return Line;
}(Objects));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(mouseX, mouseY, width, height, type, isStatic) {
        var _this = _super.call(this, mouseX, mouseY, type, isStatic) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rect.prototype.draw = function () {
        rect(this.position.x, this.position.y, this.width, this.height);
    };
    Rect.prototype.collisionWithMouse = function () {
        return pointRect(new Vector(mouseX, mouseY), this);
    };
    return Rect;
}(Objects));
//# sourceMappingURL=build.js.map