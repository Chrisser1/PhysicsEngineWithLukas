/// <reference path="Objects.ts"/>

class Circle extends Objects {
  diameter: number;
  radius: number;
  /**
   * @param mouseX The center x-position
   * @param mouseY The center y-position
   * @param diameter The diameter of the circle
   */
  constructor(
    mouseX: number,
    mouseY: number,
    diameter: number,
    type: objectTypes,
    isStatic: boolean
  ) {
    super(mouseX, mouseY, type, isStatic);
    this.diameter = diameter;
    this.radius = diameter / 2;
  }

  // Draws the circle
  draw() {
    circle(this.position.x, this.position.y, this.diameter);
  }

  collisionWithMouse() {
    return pointCircle(
      mouseX,
      mouseY,
      this.position.x,
      this.position.y,
      this.radius
    );
  }
}
