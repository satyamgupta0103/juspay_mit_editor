import { runProgram } from "./interpreter";

let activeCollisions = new Set();

function getPairId(a, b) {
  return [a.id, b.id].sort().join("-");
}

function isColliding(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 80;
}

export function startCollisionWatcher(store, dispatch) {
  function tick() {
    const state = store.getState();
    const sprites = state.sprites.sprites;

    const newCollisions = new Set();

    for (let i = 0; i < sprites.length; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        const a = sprites[i];
        const b = sprites[j];
        const pairId = getPairId(a, b);

        if (isColliding(a, b)) {
          newCollisions.add(pairId);

          if (!activeCollisions.has(pairId)) {
            // 🔥 swap
            dispatch({
              type: "sprites/swapPrograms",
              payload: { aId: a.id, bId: b.id },
            });

            // 🔥 Immediately restart both programs
            const updatedState = store.getState();
            const updatedA = updatedState.sprites.sprites.find(
              (s) => s.id === a.id,
            );
            const updatedB = updatedState.sprites.sprites.find(
              (s) => s.id === b.id,
            );

            if (updatedA) runProgram(updatedA, dispatch, store.getState);

            if (updatedB) runProgram(updatedB, dispatch, store.getState);
          }
        }
      }
    }

    activeCollisions = newCollisions;
    requestAnimationFrame(tick);
  }

  tick();
}
