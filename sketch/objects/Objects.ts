abstract class Objects {
  position: Vector;
  type: objectTypes;
  isStatic: boolean;
  speed: Vector;
  /**
   * @param x x-coordinate
   * @param y y-coordinate
   */
  constructor(x: number, y: number, type: objectTypes, isStatic: boolean) {
    this.position = new Vector(x, y);
    this.speed = new Vector(0, 0);
    this.type = type;
    this.isStatic = isStatic;
  }

  // Updates the position
  updatePos() {
    this.position.add(this.speed);
  }

  /**
   * draws the object
   */
  public abstract draw(): void;

  // Checks if the mouse is inside the object
  public abstract collisionWithMouse(): boolean;
}
