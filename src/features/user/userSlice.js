import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  user_id: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
