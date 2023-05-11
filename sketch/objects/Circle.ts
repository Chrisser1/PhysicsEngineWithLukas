/// <reference path="Objects.ts"/>

class Circle extends Objects {
  diameter: number;
  radius: number;
  /**
   * @param mouseX The center x-position
   * @param mouseY The center y-position
   * @param diameter The diameter of the circle
   */
  constructor(mouseX: number, mouseY: number, diameter: number, type: objectTypes, isStatic: boolean) {
    super(mouseX, mouseY, type, isStatic);
    this.diameter = diameter;
    this.radius = diameter / 2;
  }

  // Draws the circle
  draw() {
    circle(this.position.x, this.position.y, this.diameter);
  }

  // Checks if the mouse is inside the circle
  collisionWithMouse() {
    return pointCircle(new Vector(mouseX, mouseY), this);
  }

  public collisionWithObject(): boolean {
    throw new Error("Method not implemented.");
  }
}
