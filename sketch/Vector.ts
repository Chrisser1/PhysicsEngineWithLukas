class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Adds a vector to this vector
  add(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;
  }
}
