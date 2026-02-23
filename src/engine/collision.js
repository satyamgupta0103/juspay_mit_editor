/**Simple bounding-box collision detection*/
export function isColliding(a, b) {
  const SPRITE_SIZE = 95;

  return !(
    a.x + SPRITE_SIZE < b.x ||
    a.x > b.x + SPRITE_SIZE ||
    a.y + SPRITE_SIZE < b.y ||
    a.y > b.y + SPRITE_SIZE
  );
}
