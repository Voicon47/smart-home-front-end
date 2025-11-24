import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  id: string | null;
  name: string | null;
}

const initialState: RoomState = {
  id: null,
  name: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearRoom: (state) => {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setRoom, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
