import { updateSprite } from "../store/spriteSlice";
import { clamp, getStageBounds } from "./utils";

function shouldStop(id, version, getState) {
  const s = getState().sprites.sprites.find((sp) => sp.id === id);
  return !s || s.programVersion !== version;
}

export function move(id, steps, version, dispatch, getState) {
  return new Promise((resolve) => {
    let moved = 0;
    const dir = steps >= 0 ? 1 : -1;

    function frame() {
      if (shouldStop(id, version, getState)) return resolve();
      if (Math.abs(moved) >= Math.abs(steps)) return resolve();

      moved += dir * 2;

      const s = getState().sprites.sprites.find((sp) => sp.id === id);
      const { width } = getStageBounds();
      const nextX = clamp(s.x + dir * 2, 0, width - 95);

      dispatch(updateSprite({ id, updates: { x: nextX } }));
      requestAnimationFrame(frame);
    }

    frame();
  });
}

export function turn(id, angle, version, dispatch, getState) {
  return new Promise((resolve) => {
    let rotated = 0;
    const dir = angle >= 0 ? 1 : -1;

    function frame() {
      if (shouldStop(id, version, getState)) return resolve();
      if (Math.abs(rotated) >= Math.abs(angle)) return resolve();

      rotated += dir * 2;

      const s = getState().sprites.sprites.find((sp) => sp.id === id);
      dispatch(
        updateSprite({ id, updates: { rotation: s.rotation + dir * 2 } }),
      );
      requestAnimationFrame(frame);
    }

    frame();
  });
}

export function goTo(id, target, version, dispatch, getState) {
  return new Promise((resolve) => {
    function frame() {
      if (shouldStop(id, version, getState)) return resolve();

      const s = getState().sprites.sprites.find((sp) => sp.id === id);
      const dx = target.x - s.x;
      const dy = target.y - s.y;

      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return resolve();

      dispatch(
        updateSprite({
          id,
          updates: { x: s.x + dx * 0.1, y: s.y + dy * 0.1 },
        }),
      );

      requestAnimationFrame(frame);
    }

    frame();
  });
}

export function showMessage(id, text, duration, version, dispatch, getState) {
  return new Promise((resolve) => {
    if (shouldStop(id, version, getState)) return resolve();

    dispatch(updateSprite({ id, updates: { message: text } }));

    setTimeout(() => {
      if (!shouldStop(id, version, getState)) {
        dispatch(updateSprite({ id, updates: { message: "" } }));
      }
      resolve();
    }, duration * 1000);
  });
}
