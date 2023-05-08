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

  updatePos() {
    this.position.add(this.speed);
  }

  /**
   * draws the object
   */
  public abstract draw(): void;

  public abstract collisionWithMouse(): boolean;
}
