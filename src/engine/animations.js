import { updateSprite } from "../store/spriteSlice";
import { clamp, getStageBounds } from "./utils";

/**
 * MOVE animation with stage boundary constraint
 */
export function move(sprite, steps, dispatch, getState) {
  return new Promise((resolve) => {
    let moved = 0;
    const direction = steps >= 0 ? 1 : -1;

    function frame() {
      if (Math.abs(moved) >= Math.abs(steps)) return resolve();

      moved += direction * 2;

      const state = getState();
      const current = state.sprites.sprites.find((s) => s.id === sprite.id);
      if (!current) return resolve();

      const { width } = getStageBounds();
      const SPRITE_SIZE = 95; // Approximate size of the sprite for boundary calculations

      const nextX = clamp(current.x + direction * 2, 0, width - SPRITE_SIZE);

      dispatch(
        updateSprite({
          id: sprite.id,
          updates: { x: nextX },
        }),
      );

      requestAnimationFrame(frame);
    }

    frame();
  });
}

export function turn(sprite, angle, dispatch, getState) {
  return new Promise((resolve) => {
    let rotated = 0;
    const direction = angle >= 0 ? 1 : -1;

    function frame() {
      if (Math.abs(rotated) >= Math.abs(angle)) return resolve();

      rotated += direction * 2;

      const state = getState();
      const current = state.sprites.sprites.find((s) => s.id === sprite.id);
      if (!current) return resolve();

      dispatch(
        updateSprite({
          id: sprite.id,
          updates: { rotation: current.rotation + direction * 2 },
        }),
      );

      requestAnimationFrame(frame);
    }

    frame();
  });
}

export function showMessage(sprite, text, duration, dispatch) {
  return new Promise((resolve) => {
    dispatch(
      updateSprite({
        id: sprite.id,
        updates: { message: text },
      }),
    );

    setTimeout(() => {
      dispatch(
        updateSprite({
          id: sprite.id,
          updates: { message: "" },
        }),
      );
      resolve();
    }, duration * 1000);
  });
}

export function goTo(sprite, target, dispatch, getState) {
  return new Promise((resolve) => {
    function frame() {
      const state = getState();
      const current = state.sprites.sprites.find((s) => s.id === sprite.id);
      if (!current) return resolve();

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return resolve();

      dispatch(
        updateSprite({
          id: sprite.id,
          updates: {
            x: current.x + dx * 0.1,
            y: current.y + dy * 0.1,
          },
        }),
      );

      requestAnimationFrame(frame);
    }

    frame();
  });
}
