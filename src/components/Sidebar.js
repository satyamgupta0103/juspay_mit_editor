import React from "react";

import useBlockDrag from "../hooks/useBlockDrag";
import { BLOCKS } from "../blocks/blockTypes";

export default function Sidebar() {
  const moveBlock = useBlockDrag({
    type: BLOCKS.MOVE,
    payload: { steps: 50 },
  });

  const moveBackBlock = useBlockDrag({
    type: BLOCKS.MOVE,
    payload: { steps: -50 },
  });

  const turnLeftBlock = useBlockDrag({
    type: BLOCKS.TURN,
    payload: { angle: -15 },
  });

  const turnRightBlock = useBlockDrag({
    type: BLOCKS.TURN,
    payload: { angle: 15 },
  });

  const sayBlock = useBlockDrag({
    type: BLOCKS.SAY,
    payload: { text: "Hello!", duration: 2 },
  });

  const thinkBlock = useBlockDrag({
    type: BLOCKS.THINK,
    payload: { text: "Hmm...", duration: 2 },
  });

  const goToBlock = useBlockDrag({
    type: BLOCKS.GOTO,
    payload: { x: 300, y: 150 },
  });

  const repeatBlock = useBlockDrag({
    type: BLOCKS.REPEAT,
    payload: { times: 3 },
  });

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* EVENTS */}
      <div className="font-bold">Events</div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm">
        When 🚩 clicked
      </div>

      {/* MOTION */}
      <div className="font-bold mt-4">Motion</div>

      <div
        ref={moveBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Move 50 steps
      </div>

      <div
        ref={moveBackBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Move -50 steps
      </div>

      <div
        ref={turnLeftBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Turn 🔄 15°
      </div>

      <div
        ref={turnRightBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Turn 🔁 15°
      </div>

      <div
        ref={goToBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Go to (300,150)
      </div>

      {/* LOOKS */}
      <div className="font-bold mt-4">Looks</div>

      <div
        ref={sayBlock.drag}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Say "Hello!" for 2 sec
      </div>

      <div
        ref={thinkBlock.drag}
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Think "Hmm..." for 2 sec
      </div>

      <div
        ref={repeatBlock.drag}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        Repeat 3 times
      </div>
    </div>
  );
}
