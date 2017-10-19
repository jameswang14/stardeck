/*
  Returns area overlapping between two rectangles
  Returns 0 if the rectangles don't intersect
  https://math.stackexchange.com/questions/99565/simplest-way-to-calculate-the-intersect-area-of-two-rectangles
*/
function GetRectangleIntersectionArea(r1, r2) {
  x_overlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
  y_overlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
  return x_overlap * y_overlap;
}


define(function() {
  return function(r1, r2) {
    return GetRectangleIntersectionArea(r1, r2);
  }
});


