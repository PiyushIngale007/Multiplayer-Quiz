import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  userID: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
