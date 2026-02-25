import React, { useState } from "react";
import useBlockDrag from "../hooks/useBlockDrag";
import { BLOCKS } from "../blocks/blockTypes";

export default function Sidebar() {
  const [moveSteps, setMoveSteps] = useState(50);
  const [moveBackSteps, setMoveBackSteps] = useState(50);
  const [turnRightDeg, setTurnRightDeg] = useState(15);
  const [turnLeftDeg, setTurnLeftDeg] = useState(15);
  const [goToX, setGoToX] = useState(200);
  const [goToY, setGoToY] = useState(150);
  const [repeatCount, setRepeatCount] = useState(3);

  const [sayText, setSayText] = useState("Hello!");
  const [sayDuration, setSayDuration] = useState(2);

  const [thinkText, setThinkText] = useState("Hmm...");
  const [thinkDuration, setThinkDuration] = useState(2);

  const moveBlock = useBlockDrag(
    () => ({
      type: BLOCKS.MOVE,
      payload: { steps: Number(moveSteps) },
    }),
    [moveSteps],
  );

  const moveBackBlock = useBlockDrag(
    () => ({
      type: BLOCKS.MOVE,
      payload: { steps: -Number(moveBackSteps) },
    }),
    [moveBackSteps],
  );

  const turnRightBlock = useBlockDrag(
    () => ({
      type: BLOCKS.TURN,
      payload: { angle: Number(turnRightDeg) },
    }),
    [turnRightDeg],
  );

  const turnLeftBlock = useBlockDrag(
    () => ({
      type: BLOCKS.TURN,
      payload: { angle: -Number(turnLeftDeg) },
    }),
    [turnLeftDeg],
  );

  const goToBlock = useBlockDrag(
    () => ({
      type: BLOCKS.GOTO,
      payload: { x: Number(goToX), y: Number(goToY) },
    }),
    [goToX, goToY],
  );

  const repeatBlock = useBlockDrag(
    () => ({
      type: BLOCKS.REPEAT,
      payload: { times: Number(repeatCount), children: [] },
    }),
    [repeatCount],
  );

  const sayBlock = useBlockDrag(
    () => ({
      type: BLOCKS.SAY,
      payload: { text: sayText, duration: Number(sayDuration) },
    }),
    [sayText, sayDuration],
  );

  const thinkBlock = useBlockDrag(
    () => ({
      type: BLOCKS.THINK,
      payload: { text: thinkText, duration: Number(thinkDuration) },
    }),
    [thinkText, thinkDuration],
  );

  const blockStyle =
    "flex items-center bg-blue-500 text-white px-2 py-2 my-2 text-sm rounded";

  const looksBlockStyle =
    "bg-purple-500 text-white px-2 py-2 my-2 text-sm rounded flex flex-col";

  const dragHandle =
    "mr-2 px-2 py-1 bg-blue-700 rounded cursor-grab active:cursor-grabbing";

  const inputStyle = "w-14 mx-1 px-1 text-black rounded border border-gray-300";

  const textInputStyle =
    "w-28 mx-1 px-1 text-black rounded border border-gray-300";

  const rowStyle = "flex items-center flex-wrap mt-1";

  return (
    <div className="w-64 flex-none h-full overflow-y-auto flex flex-col p-2 border-r border-gray-200">
      <div className="font-bold">Motion</div>

      <div className={blockStyle}>
        <span ref={moveBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Move +
        <input
          type="number"
          value={moveSteps}
          onChange={(e) => setMoveSteps(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        steps
      </div>

      <div className={blockStyle}>
        <span ref={moveBackBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Move -
        <input
          type="number"
          value={moveBackSteps}
          onChange={(e) => setMoveBackSteps(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        steps
      </div>

      <div className={blockStyle}>
        <span ref={turnRightBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Turn +
        <input
          type="number"
          value={turnRightDeg}
          onChange={(e) => setTurnRightDeg(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        °
      </div>

      <div className={blockStyle}>
        <span ref={turnLeftBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Turn -
        <input
          type="number"
          value={turnLeftDeg}
          onChange={(e) => setTurnLeftDeg(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        °
      </div>

      <div className={blockStyle}>
        <span ref={goToBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Go to x:
        <input
          type="number"
          value={goToX}
          onChange={(e) => setGoToX(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        y:
        <input
          type="number"
          value={goToY}
          onChange={(e) => setGoToY(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="font-bold mt-4">Looks</div>

      <div className={looksBlockStyle}>
        <div ref={sayBlock.drag} className={dragHandle + " w-fit"}>
          ⠿
        </div>
        <div className={rowStyle}>
          Say
          <input
            type="text"
            value={sayText}
            onChange={(e) => setSayText(e.target.value)}
            className={textInputStyle}
            onClick={(e) => e.stopPropagation()}
          />
          for
          <input
            type="number"
            value={sayDuration}
            onChange={(e) => setSayDuration(e.target.value)}
            className={inputStyle}
            onClick={(e) => e.stopPropagation()}
          />
          sec
        </div>
      </div>

      <div className={looksBlockStyle}>
        <div ref={thinkBlock.drag} className={dragHandle + " w-fit"}>
          ⠿
        </div>
        <div className={rowStyle}>
          Think
          <input
            type="text"
            value={thinkText}
            onChange={(e) => setThinkText(e.target.value)}
            className={textInputStyle}
            onClick={(e) => e.stopPropagation()}
          />
          for
          <input
            type="number"
            value={thinkDuration}
            onChange={(e) => setThinkDuration(e.target.value)}
            className={inputStyle}
            onClick={(e) => e.stopPropagation()}
          />
          sec
        </div>
      </div>

      <div className="font-bold mt-4">Controls</div>

      <div className={blockStyle}>
        <span ref={repeatBlock.drag} className={dragHandle}>
          ⠿
        </span>
        Repeat
        <input
          type="number"
          value={repeatCount}
          onChange={(e) => setRepeatCount(e.target.value)}
          className={inputStyle}
          onClick={(e) => e.stopPropagation()}
        />
        times
      </div>
    </div>
  );
}
