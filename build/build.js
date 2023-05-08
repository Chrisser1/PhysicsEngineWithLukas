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
    ObjectsManager.prototype.tick = function () {
        this.addGravity();
        this.updateObjectsPos();
        this.drawObjects();
    };
    return ObjectsManager;
}());
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
    sliderWidth = document.getElementById("sliderWidth");
    sliderHeight = document.getElementById("sliderHeight");
    sliderDiameter = document.getElementById("sliderDiameter");
    var cnv = createCanvas(900, 500);
    cnv.position((windowWidth - width) / 2);
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
})(objectTypes || (objectTypes = {}));
function pointRect(px, py, rx, ry, rw, rh) {
    if (px >= rx &&
        px <= rx + rw &&
        py >= ry &&
        py <= ry + rh) {
        return true;
    }
    return false;
}
function pointCircle(px, py, cx, cy, radius) {
    var distX = px - cx;
    var distY = py - cy;
    var distance = sqrt(distX * distX + distY * distY);
    if (distance <= radius) {
        return true;
    }
    return false;
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
        return pointCircle(mouseX, mouseY, this.position.x, this.position.y, this.radius);
    };
    return Circle;
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
        return pointRect(mouseX, mouseY, this.position.x, this.position.y, this.width, this.height);
    };
    return Rect;
}(Objects));
//# sourceMappingURL=build.js.map