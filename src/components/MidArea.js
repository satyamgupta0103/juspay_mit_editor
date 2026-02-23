import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addInstruction } from "../store/spriteSlice";

function renderInstruction(inst) {
  switch (inst.type) {
    case "MOVE":
      return `Move ${inst.payload.steps} steps`;

    case "TURN":
      return `Turn ${inst.payload.angle}°`;

    case "SAY":
      return `Say "${inst.payload.text}" for ${inst.payload.duration}s`;

    case "THINK":
      return `Think "${inst.payload.text}" for ${inst.payload.duration}s`;

    case "GOTO":
      return `Go to (${inst.payload.x}, ${inst.payload.y})`;

    case "REPEAT":
      return `Repeat ${inst.payload.times} times`;

    default:
      return inst.type;
  }
}

export default function MidArea() {
  const dispatch = useDispatch();

  const activeSpriteId = useSelector((state) => state.sprites.selectedSpriteId);

  const instructions = useSelector((state) => {
    const sprite = state.sprites.sprites.find(
      (s) => s.id === state.sprites.selectedSpriteId,
    );
    return sprite?.instructions || [];
  });

  const [, drop] = useDrop(
    () => ({
      accept: "BLOCK",
      drop: (item) => {
        if (!activeSpriteId) return;

        dispatch(
          addInstruction({
            spriteId: activeSpriteId,
            instruction: item,
          }),
        );
      },
    }),
    [activeSpriteId],
  );

  return (
    <div ref={drop} className="flex-1 h-full overflow-auto p-4 bg-gray-50">
      <p className="text-gray-400 mb-4">Program</p>

      {instructions.length === 0 && (
        <p className="text-sm text-gray-300">
          Drag blocks here to build a program
        </p>
      )}

      {instructions.map((inst, index) => (
        <div key={index} className="bg-blue-200 p-2 my-2 rounded shadow-sm">
          {renderInstruction(inst)}
        </div>
      ))}
    </div>
  );
}
