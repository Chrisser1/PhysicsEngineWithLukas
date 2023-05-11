/**
 * Returns true if a point is inside a Rectangle
 * @param point
 * @param rect
 * @returns boolean
 */
function pointRect(point: Vector, rect: Rect): boolean {
  // is the point inside the rectangle's bounds?
  if (
    point.x >= rect.position.x && // right of the left edge AND
    point.x <= rect.position.x + rect.width && // left of the right edge AND
    point.y >= rect.position.y && // below the top AND
    point.y <= rect.position.y + rect.height
  ) {
    // above the bottom
    return true;
  }
  return false;
}

/**
 * Returns is a point is inside a Circle
 * @param px points x
 * @param py points y
 * @param cx circles x
 * @param cy circles y
 * @param radius circles radius
 * @returns boolean
 */

function pointCircle(point: Vector, circle: Circle): boolean {
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  let distX = point.x - circle.position.x;
  let distY = point.y - circle.position.y;
  let distance = sqrt(distX * distX + distY * distY);

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= circle.radius) {
    return true;
  }
  return false;
}

/**
 * A function to check wether or not there is collision between a circle and a rectangle
 * @param circle
 * @param rect
 * @returns true or false
 */

function circleRectangle(circle: Circle, rect: Rect): boolean {
  let testX;
  let testY;

  // Get which edge is closest
  if (circle.position.x < rect.position.x) {
    testX = rect.position.x;
  } // Test left edge
  else if (circle.position.x > rect.position.x + rect.width) {
    testX = rect.position.x + rect.width;
  } // Test right edge
  if (circle.position.y < rect.position.y) {
    testY = rect.position.y;
  } // Test top edge
  else if (circle.position.y > rect.position.y) {
    testY = +rect.height;
  } // Test bottom edge

  // Get the distance from closest edges
  let distX = circle.position.x - testX;
  let distY = circle.position.y - testY;
  let distance = sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= circle.radius) {
    return true;
  }
  return false;
}

function linePoint(line: Line, point: Vector): boolean {
  // get distance from the point to the two ends of the line
  let d1 = dist(point.x, point.y, line.position.x, line.position.y);
  let d2 = dist(point.x, point.y, line.position2.x, line.position2.y);

  // get the length of the line
  let lineLen = dist(line.position.x, line.position.y, line.position2.x, line.position2.y);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  let buffer = 0.1; // higher # = less accurate

  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;
}

function lineCircle(line: Line, circle: Circle): boolean {
  let inside1 = pointCircle(line.position, circle);
  let inside2 = pointCircle(line.position2, circle);

  if (inside1 || inside2) {
    return true;
  }

  // get length of the line
  let distX = line.position.x - line.position2.x;
  let distY = line.position.y - line.position2.y;
  let len = sqrt(distX * distX + distY * distY);

  // get dot product of the line and circle
  let dot = ((circle.position.x - line.position.x) * (line.position2.x - line.position.x) + (circle.position.y - line.position.y) * (line.position2.y - line.position.y)) / pow(len, 2);

  let closestX = line.position.x + dot * (line.position2.x - line.position.x);
  let closestY = line.position.y + dot * (line.position2.y - line.position.y);

  // find the closest point on the line
  let onSegment: boolean = linePoint(line, circle.position);
  if (onSegment === false) return false;

  distX = closestX - circle.position.x;
  distY = closestY - circle.position.y;
  let distance = Math.sqrt(distX * distX + distY * distY);

  if (distance <= circle.radius) {
    return true;
  }
  return false;
}

function LineLine(line1: Line, line2: Line) {
  let x1 = line1.position.x;
  let x2 = line1.position2.x;
  let x3 = line2.position.x;
  let x4 = line2.position2.x;

  let y1 = line1.position.y;
  let y2 = line1.position2.y;
  let y3 = line2.position.y;
  let y4 = line2.position2.y;

  // calculate the distance to intersection point
  let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}

function circleCircle(circle1: Circle, circle2: Circle): boolean {
  let distX = circle1.position.x - circle2.position.x;
  let distY = circle1.position.y - circle2.position.y;
  let distance = sqrt(distX * distX + distY * distY);

  if (distance <= circle1.radius + circle2.radius) {
    return true;
  }
  return false;
}


function rectangleRectangle(rect1: Rect, rect2: Rect): boolean{
  if (
    rect1.position.x + rect2.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y + rect1.height >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.height
  ) {
    return true;
  }
  return false;
}