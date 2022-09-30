import { createSlice } from "@reduxjs/toolkit";

const initialCounselorState = { counter: 0, counselor: undefined };

const counselorSlice = createSlice({
  name: "counselor",
  initialState: initialCounselorState,
  reducers: {
    selectCounselor(state, action) {
      console.log("in store");
      console.log(action.payload);
      state.counselor = action.payload;
    },
  },
});

export const counselorActions = counselorSlice.actions;
export default counselorSlice.reducer;
