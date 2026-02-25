import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addInstruction, addChildInstruction } from "../store/spriteSlice";

/* ---------------- RECURSIVE BLOCK ---------------- */

function InstructionBlock({ inst, index }) {
  const dispatch = useDispatch();
  const spriteId = useSelector((s) => s.sprites.selectedSpriteId);

  const [, drop] = useDrop(
    () => ({
      accept: "BLOCK",

      drop: (item, monitor) => {
        if (monitor.didDrop()) return;

        if (inst.type !== "REPEAT") return;

        dispatch(
          addChildInstruction({
            spriteId,
            parentIndex: index,
            instruction: JSON.parse(JSON.stringify(item)),
          }),
        );
      },
    }),
    [spriteId, index, inst.type],
  );

  return (
    <div className="bg-blue-200 p-2 my-2 rounded shadow-sm">
      {inst.type === "MOVE" && `Move ${inst.payload.steps} steps`}
      {inst.type === "TURN" && `Turn ${inst.payload.angle}°`}
      {inst.type === "GOTO" && `Go to (${inst.payload.x}, ${inst.payload.y})`}
      {inst.type === "SAY" &&
        `Say "${inst.payload.text}" for ${inst.payload.duration}s`}
      {inst.type === "THINK" &&
        `Think "${inst.payload.text}" for ${inst.payload.duration}s`}

      {inst.type === "REPEAT" && (
        <div ref={drop} className="bg-yellow-200 p-2 mt-2 rounded">
          <div>Repeat {inst.payload.times} times</div>

          <div className="ml-4 border-l-2 pl-2 mt-2">
            {inst.payload.children.length === 0 && (
              <div className="text-xs text-gray-400">Drop blocks here</div>
            )}

            {inst.payload.children.map((child, i) => (
              <InstructionBlock key={i} inst={child} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MidArea() {
  const dispatch = useDispatch();
  const spriteId = useSelector((s) => s.sprites.selectedSpriteId);

  const instructions = useSelector((state) => {
    const sprite = state.sprites.sprites.find(
      (s) => s.id === state.sprites.selectedSpriteId,
    );
    return sprite?.instructions || [];
  });

  const [, drop] = useDrop(
    () => ({
      accept: "BLOCK",

      drop: (item, monitor) => {
        if (monitor.didDrop()) return;

        dispatch(
          addInstruction({
            spriteId,
            instruction: JSON.parse(JSON.stringify(item)),
          }),
        );
      },
    }),
    [spriteId],
  );

  return (
    <div ref={drop} className="flex-1 h-full overflow-auto p-4 bg-gray-50">
      <p className="text-gray-400 mb-4">Program</p>

      {instructions.length === 0 && (
        <p className="text-sm text-gray-300">
          Drag blocks here to build a program
        </p>
      )}

      {instructions.map((inst, i) => (
        <InstructionBlock key={i} inst={inst} index={i} />
      ))}
    </div>
  );
}
