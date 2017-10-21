/*
  Returns area overlapping between two rectangles
  Returns 0 if the rectangles don't intersect
  https://math.stackexchange.com/questions/99565/simplest-way-to-calculate-the-intersect-area-of-two-rectangles
*/
export default function GetRectangleIntersectionArea(r1, r2) {
  let x_overlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
  let y_overlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
  return x_overlap * y_overlap;
}