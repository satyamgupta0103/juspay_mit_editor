import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  sprites: [
    {
      id: "sprite-1",
      character: "cat", //default character
      x: 220,
      y: 100,
      rotation: 0,
      message: "",
      instructions: [],
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
            character, //STORE CHARACTER TYPE
            x: 120,
            y: 120,
            rotation: 0,
            message: "",
            instructions: [],
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
      if (sprite) {
        sprite.instructions.push(instruction);
      }
    },

    updateSprite(state, action) {
      const { id, updates } = action.payload;
      const sprite = state.sprites.find((s) => s.id === id);
      if (sprite) {
        Object.assign(sprite, updates);
      }
    },

    swapPrograms(state, action) {
      const { aId, bId } = action.payload;
      const a = state.sprites.find((s) => s.id === aId);
      const b = state.sprites.find((s) => s.id === bId);

      if (a && b) {
        [a.instructions, b.instructions] = [b.instructions, a.instructions];
      }
    },
  },
});

export const {
  addSprite,
  setSelectedSprite,
  addInstruction,
  updateSprite,
  swapPrograms,
} = spriteSlice.actions;

export default spriteSlice.reducer;
