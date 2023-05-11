// This is the class that represents a rectangle
class Rect extends Objects {
  // Initialize position and size
  width: number;
  height: number;

  /**
   * @param mouseX The left corner x-position
   * @param mouseY The left corner y-position
   * @param width  The width of the rectangle
   * @param height The hight of the rectangle
   */
  constructor(mouseX: number, mouseY: number, width: number, height: number, type: objectTypes, isStatic: boolean) {
    super(mouseX, mouseY, type, isStatic);
    this.width = width;
    this.height = height;
  }

  // Draws the rectangle
  draw() {
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  // Checks if the mouse is inside the rectangle
  collisionWithMouse() {
    return pointRect(new Vector(mouseX, mouseY), this);
  }
}
