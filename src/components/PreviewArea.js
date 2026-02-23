import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSprite,
  setSelectedSprite,
  updateSprite,
} from "../store/spriteSlice";
import { runProgram } from "../engine/interpreter";
import { store } from "../store/store";
import { startCollisionWatcher } from "../engine/collisionWatcher";
import { CHARACTER_MAP } from "../constants/characterMap";

export default function PreviewArea() {
  const sprites = useSelector((state) => state.sprites.sprites);
  const selectedSpriteId = useSelector(
    (state) => state.sprites.selectedSpriteId,
  );

  const dispatch = useDispatch();

  // ✅ NEW — selected character from dropdown
  const [selectedCharacter, setSelectedCharacter] = useState("cat");
  const [openChooser, setOpenChooser] = useState(false);

  /**
   * ▶ Play should run ALL sprites (HR requirement #2)
   */
  const handlePlay = () => {
    const state = store.getState();

    state.sprites.sprites.forEach((sprite) => {
      runProgram(sprite, dispatch, store.getState);
    });
  };

  /**
   * Start collision watcher (Hero Feature)
   */
  useEffect(() => {
    startCollisionWatcher(store, dispatch);
  }, [dispatch]);

  /**
   * ✅ Dragging logic (HR requirement #3)
   */
  const startDragging = (e, sprite) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = sprite.x;
    const initialY = sprite.y;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      dispatch(
        updateSprite({
          id: sprite.id,
          updates: {
            x: initialX + dx,
            y: initialY + dy,
          },
        }),
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      id="stage"
      className="flex-1 h-full relative bg-gray-100 overflow-hidden"
    >
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20">
        {/* LEFT SIDE CONTROLS */}
        <div className="flex items-center gap-3">
          {/* Choose Character */}
          <div className="relative">
            <button
              onClick={() => setOpenChooser(!openChooser)}
              className="bg-blue-500 text-white px-4 py-1 rounded shadow hover:bg-blue-600 transition"
            >
              Choose Character ▾
            </button>

            {openChooser && (
              <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg">
                {["cat", "dog", "bunny", "panda"].map((char) => (
                  <div
                    key={char}
                    onClick={() => {
                      setSelectedCharacter(char);
                      setOpenChooser(false);
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedCharacter === char
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                  >
                    {char.charAt(0).toUpperCase() + char.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Sprite */}
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded shadow hover:bg-blue-600 transition"
            onClick={() => dispatch(addSprite(selectedCharacter))}
          >
            + Add Sprite
          </button>
        </div>

        {/* RIGHT SIDE */}
        <button
          className="bg-green-500 text-white px-4 py-1 rounded shadow hover:bg-green-600 transition"
          onClick={handlePlay}
        >
          ▶ Play
        </button>
      </div>

      {/* ✅ Render dynamic character sprites */}
      {sprites.map((sprite) => {
        const Character =
          CHARACTER_MAP[sprite.character] || CHARACTER_MAP["cat"];

        return (
          <div
            key={sprite.id}
            onClick={() => dispatch(setSelectedSprite(sprite.id))}
            onMouseDown={(e) => startDragging(e, sprite)}
            className={`absolute cursor-move ${
              selectedSpriteId === sprite.id ? "ring-4 ring-blue-400" : ""
            }`}
            style={{
              left: sprite.x,
              top: sprite.y,
              transform: `rotate(${sprite.rotation}deg)`,
            }}
          >
            <Character message={sprite.message} />
          </div>
        );
      })}
    </div>
  );
}
