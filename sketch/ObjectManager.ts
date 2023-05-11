// This class manages the objects, eks drawing them and previewing
class ObjectsManager {
  objects: Objects[];

  // Init valuables
  constructor() {
    this.objects = [];
  }

  /**
   * Shows a preview of the object you want to show
   * @param width  The width of the object
   * @param height The hight of the object
   * @param diameter The diameter of the object
   * @param type The type of the object
   */
  public preview(width: number, height: number, diameter: number, type: objectTypes) {
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
  }

  /**
   * Creates a object at current mouse position with a defined hight and width or diameter
   * @param rectWidth  The width of the object
   * @param rectHeight The hight of the object
   * @param diameter   The diameter of the object
   * @param type       The type of the object
   */
  public createObject(rectWidth: number, rectHeight: number, diameter: number, type: objectTypes, isStatic: boolean) {
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
  }

  /**
   * Draws the objects
   */
  public drawObjects() {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].draw();
    }
  }

  /**
   * deletes a object
   */
  public deleteObject(xPosition: number, yPosition: number, objects: objectTypes) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].collisionWithMouse()) {
        this.objects.splice(i, 1);
      }
    }
  }

  /**
   * Adds gravity to the objects
   */
  addGravity() {
    this.objects.forEach((object) => {
      if (object.isStatic === false) {
        object.speed.y += 9.82e-2;
      }
    });
  }

  /**
   * Updates the objects position
   */
  updateObjectsPos() {
    this.objects.forEach((object) => {
      object.updatePos();
    });
  }

  chooseCollisionCheck(object1: Objects, object2: Objects) {
    let colliding;
    switch (object1.type, object2.type) {
      case objectTypes.Rect && objectTypes.Rect:
        colliding = rectangleRectangle(object1 as Rect, object2 as Rect);
        break;
        case objectTypes.Rect && objectTypes.Circle:
          colliding = circleRectangle(object1 as Circle , object2 as Rect);
          break;
          case objectTypes.Circle && objectTypes.Rect:
            colliding = circleRectangle(object1 as Circle, object2 as Rect);
            break;
            case objectTypes.Circle && objectTypes.Circle:
              colliding = circleCircle(object1 as Circle, object2 as Circle);
              break;
              default:
                console.error("Error there is no type");
          
    }
  }

  checkCollisionBetweenObjects() {
    this.objects.forEach((object, i) => {
      let tempObjectArray = this.objects.concat();
      tempObjectArray.splice(i, 1);
      tempObjectArray.forEach((secondObject) => {});
    });
  }

  /**
   * Updates the objects
   */
  tick() {
    this.addGravity();
    this.updateObjectsPos();
    this.drawObjects();
  }
}
