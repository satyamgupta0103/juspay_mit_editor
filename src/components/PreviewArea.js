import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CatSprite from "./CatSprite";
import { addSprite } from "../store/spriteSlice";
import { runProgram } from "../engine/interpreter";
import { store } from "../store/store";
import { useEffect } from "react";
import { startCollisionWatcher } from "../engine/collisionWatcher";

export default function PreviewArea() {
  const sprites = useSelector((state) => state.sprites.sprites);
  const selectedSpriteId = useSelector(
    (state) => state.sprites.selectedSpriteId,
  );

  const dispatch = useDispatch();

  const handlePlay = () => {
    const state = store.getState();

    // Run program of EVERY sprite independently
    state.sprites.sprites.forEach((sprite) => {
      runProgram(sprite, dispatch, store.getState);
    });
  };

  useEffect(() => {
    startCollisionWatcher(store, dispatch);
  }, [dispatch]);

  return (
    <div
      id="stage"
      className="flex-1 h-full relative bg-gray-100 overflow-hidden"
    >
      {/* Add Sprite */}
      <button
        className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded z-10"
        onClick={() => dispatch(addSprite())}
      >
        + Add Sprite
      </button>

      {/* Play */}
      <button
        className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded z-10"
        onClick={handlePlay}
      >
        ▶ Play
      </button>

      {/* Render sprites */}
      {sprites.map((sprite) => (
        <CatSprite key={sprite.id} sprite={sprite} />
      ))}
    </div>
  );
}
