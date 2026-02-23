import { move, turn, showMessage, goTo } from "./animations";
import { BLOCKS } from "../blocks/blockTypes";

export async function runProgram(sprite, dispatch, getState) {
  for (const instruction of sprite.instructions) {
    const currentSprite = getState().sprites.sprites.find(
      (s) => s.id === sprite.id,
    );

    if (!currentSprite) return;

    switch (instruction.type) {
      case BLOCKS.MOVE:
        await move(
          currentSprite,
          instruction.payload.steps,
          dispatch,
          getState,
        );
        break;

      case BLOCKS.TURN:
        await turn(
          currentSprite,
          instruction.payload.angle,
          dispatch,
          getState,
        );
        break;

      case BLOCKS.GOTO:
        await goTo(currentSprite, instruction.payload, dispatch, getState);
        break;

      case BLOCKS.REPEAT:
        for (let i = 0; i < instruction.payload.times; i++) {
          for (const inst of sprite.instructions) {
            if (inst === instruction) continue; // avoid infinite loop
            await runProgram(
              { ...sprite, instructions: [inst] },
              dispatch,
              getState,
            );
          }
        }
        break;

      case BLOCKS.SAY:
      case BLOCKS.THINK:
        await showMessage(
          currentSprite,
          instruction.payload.text,
          instruction.payload.duration,
          dispatch,
        );
        break;

      default:
        break;
    }
  }
}
