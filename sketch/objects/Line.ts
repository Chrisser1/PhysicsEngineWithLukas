class Line extends Objects {
  position2: Vector;
  constructor(
    x1: number,
    y1: number,
    y2: number,
    x2: number,
    isStatic: boolean,
    position2: Vector
  ) {
    super(x1, y1, objectTypes.Line, isStatic);
    this.position2 = new Vector(x2, y2);
  }
  public draw(): void {
    line(this.position.x, this.position.y, this.position2.x, this.position2.y);
  }
  public collisionWithMouse(): boolean {
    throw new Error("Method not implemented.");
  }
}
