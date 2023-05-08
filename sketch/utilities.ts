enum objectTypes {
  Rect,
  Circle,
}

function pointRect(
  px: number,
  py: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
) {
  // is the point inside the rectangle's bounds?
  if (
    px >= rx && // right of the left edge AND
    px <= rx + rw && // left of the right edge AND
    py >= ry && // below the top AND
    py <= ry + rh
  ) {
    // above the bottom
    return true;
  }
  return false;
}

function pointCircle(
  px: number,
  py: number,
  cx: number,
  cy: number,
  radius: number
) {
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  let distX = px - cx;
  let distY = py - cy;
  let distance = sqrt(distX * distX + distY * distY);

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= radius) {
    return true;
  }
  return false;
}
