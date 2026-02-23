import { isColliding } from "./collision";
import { swapPrograms } from "../store/spriteSlice";

/**
 * Runs a lightweight loop checking collisions.
 * When detected → swaps programs once.
 */
export function startCollisionWatcher(store, dispatch) {
  let hasSwapped = false;

  function loop() {
    const state = store.getState();
    const sprites = state.sprites.sprites;

    if (sprites.length >= 2) {
      for (let i = 0; i < sprites.length; i++) {
        for (let j = i + 1; j < sprites.length; j++) {
          const a = sprites[i];
          const b = sprites[j];

          if (isColliding(a, b) && !hasSwapped) {
            dispatch(swapPrograms({ aId: a.id, bId: b.id }));
            hasSwapped = true;

            console.log("🔥 Collision detected — programs swapped");
          }
        }
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}
