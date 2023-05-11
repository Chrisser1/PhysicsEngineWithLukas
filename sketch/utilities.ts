// Lists the types of objects that can be drawn
enum objectTypes {
  Rect,
  Circle,
  Line,
}

function closestPointOnLine(line: Line, point: Vector): Vector {
  let A1 = line.position2.y - line.position.y;
  let B1 = line.position.x - line.position2.x;

  let C1 = A1 * line.position.x + B1 * line.position.y;
  let C2 = -B1 * point.x + A1 * point.y;
  let determinant = A1 * A1 - -B1 * B1;
  let cx = 0;
  let cy = 0;
  if (determinant != 0) {
    cx = (A1 * C1 - B1 * C2) / determinant;
    cy = (A1 * C2 - -B1 * C1) / determinant;
  } else {
    cx = point.x;
    cy = point.y;
  }
  return new Vector(cx, cy);
}

function moveIntersectingCircles(circle1: Circle, circle2: Circle) {
  let midPointX = (circle1.position.x + circle2.position.x) / 2
  let midPointY = (circle1.position.y + circle2.position.y) / 2

  // https://ericleong.me/research/circle-circle/
  // circle1.position.x = midPointX + circle1.radius * (circle1.position.x - circle2.position.x) / dist; 
  // circle1.position.y = midPointY + circle1.radius * (circle1.position.y - circle2.position.y) / dist; 
  // circle2.position.x = midPointX + circle2.radius * (circle2.position.x - circle1.position.x) / dist; 
  // circle2.position.y = midPointY + circle2.radius * (circle2.position.y - circle1.position.y) / dist;
}