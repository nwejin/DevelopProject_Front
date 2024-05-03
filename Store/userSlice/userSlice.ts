'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userId: string;
  height: number;
  weight: number;
}

const initialState: UserState = {
  userId: '',
  height: 0,
  weight: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserHeight(state, action) {
      state.height = action.payload;
    },
    setUserWeight(state, action) {
      state.weight = action.payload;
    },
  },
});

export const { setUserId, setUserHeight, setUserWeight } = userSlice.actions;

export default userSlice.reducer;
