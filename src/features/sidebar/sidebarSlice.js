import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapseStatus: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCollapseStatus: (state, action) => {
      console.log(action);
      return { ...state, collapseStatus: action.payload };
    },
  },
});

export const { setCollapseStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
