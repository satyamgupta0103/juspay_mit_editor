import { move, turn, showMessage, goTo } from "./animations";
import { BLOCKS } from "../blocks/blockTypes";

export async function runProgram(sprite, dispatch, getState) {
  const startVersion = sprite.programVersion;

  async function runInstructions(instructions) {
    for (const instruction of instructions) {
      const current = getState().sprites.sprites.find(
        (s) => s.id === sprite.id,
      );
      if (!current) return;

      // 🔥 STOP if swapped during execution
      if (current.programVersion !== startVersion) return;

      switch (instruction.type) {
        case BLOCKS.MOVE:
          await move(
            sprite.id,
            instruction.payload.steps,
            startVersion,
            dispatch,
            getState,
          );
          break;

        case BLOCKS.TURN:
          await turn(
            sprite.id,
            instruction.payload.angle,
            startVersion,
            dispatch,
            getState,
          );
          break;

        case BLOCKS.GOTO:
          await goTo(
            sprite.id,
            instruction.payload,
            startVersion,
            dispatch,
            getState,
          );
          break;

        case BLOCKS.REPEAT:
          for (let i = 0; i < instruction.payload.times; i++) {
            const cur = getState().sprites.sprites.find(
              (s) => s.id === sprite.id,
            );
            if (cur.programVersion !== startVersion) return;

            await runInstructions(instruction.payload.children);
          }
          break;

        case BLOCKS.SAY:
        case BLOCKS.THINK:
          await showMessage(
            sprite.id,
            instruction.payload.text,
            instruction.payload.duration,
            startVersion,
            dispatch,
            getState,
          );
          break;

        default:
          break;
      }
    }
  }

  await runInstructions(sprite.instructions);
}
