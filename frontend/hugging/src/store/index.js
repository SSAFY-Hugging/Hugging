import { configureStore } from "@reduxjs/toolkit";

import counselorReducer from "./counselor";

const store = configureStore({
  reducer: {
    counselor: counselorReducer,
  },
});

export default store;
