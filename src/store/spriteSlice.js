import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  sprites: [
    {
      id: "sprite-1",
      character: "cat",
      x: 220,
      y: 100,
      rotation: 0,
      message: "",
      instructions: [],
      programVersion: 0,
    },
  ],
  selectedSpriteId: "sprite-1",
};

const spriteSlice = createSlice({
  name: "sprites",
  initialState,
  reducers: {
    addSprite: {
      reducer(state, action) {
        state.sprites.push(action.payload);
      },
      prepare(character = "cat") {
        const id = nanoid();
        return {
          payload: {
            id,
            character,
            x: 120,
            y: 120,
            rotation: 0,
            message: "",
            instructions: [],
            programVersion: 0, // 🔥 IMPORTANT
          },
        };
      },
    },

    setSelectedSprite(state, action) {
      state.selectedSpriteId = action.payload;
    },

    addInstruction(state, action) {
      const { spriteId, instruction } = action.payload;
      const sprite = state.sprites.find((s) => s.id === spriteId);
      if (sprite) sprite.instructions.push(instruction);
    },

    addChildInstruction(state, action) {
      const { spriteId, parentIndex, instruction } = action.payload;
      const sprite = state.sprites.find((s) => s.id === spriteId);
      if (!sprite) return;

      const parent = sprite.instructions[parentIndex];
      if (parent?.type === "REPEAT") {
        parent.payload.children.push(instruction);
      }
    },

    updateSprite(state, action) {
      const { id, updates } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) Object.assign(sprite, updates);
    },

    swapPrograms(state, action) {
      const { aId, bId } = action.payload;
      const a = state.sprites.find((s) => s.id === aId);
      const b = state.sprites.find((s) => s.id === bId);

      if (a && b) {
        [a.instructions, b.instructions] = [b.instructions, a.instructions];

        // 🔥 THIS FORCES RUNNING PROGRAM TO STOP
        a.programVersion++;
        b.programVersion++;
      }
    },
  },
});

export const {
  addSprite,
  setSelectedSprite,
  addInstruction,
  addChildInstruction,
  updateSprite,
  swapPrograms,
} = spriteSlice.actions;

export default spriteSlice.reducer;
