// Lists the types of objects that can be drawn
enum objectTypes {
  Rect,
  Circle,
}

/**
 * Returns is a point is inside a Rectangle
 * @param px points x
 * @param py points y
 * @param rx rectangles x
 * @param ry rectangles y
 * @param rw rectangles width
 * @param rh rectangles height
 * @returns boolean
 */
function pointRect(
  px: number,
  py: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
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
/**
 * Returns is a point is inside a Circle
 * @param px points x
 * @param py points y
 * @param cx circles x
 * @param cy circles y
 * @param radius circles radius
 * @returns boolean
*/

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
