import { configureStore, createSlice } from "@reduxjs/toolkit";

let counselor = createSlice({
  name: "counselor",
  initialState: {
    id: "",
    pw: "",
  },
  reducers: {
    loginCounselor: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isLoggined = true;
    },
    clearCounselor: (state) => {
      state.name = "";
      state.id = "";
      state.isLogin = false;
    },
  },
});

let user = createSlice({
  name: "user",
  initialState: {
    email: "",
    nickname: "",
    age: "",
    gender: "",
    emotion: ["불안", "우울", "상실"],
    profileImage: 0,
  },
  reducers: {
    deleteEmotion(state, action) {
      state.emotion.map((a, i) => {
        console.log(state.emotion);
        if (state.emotion[i] === action.payload) {
          state.emotion.splice(i, 1);
        }
      });
    },

    loginUser(state, action) {
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.emotion = action.payload.emotion;
      state.age = action.payload.age;
      state.profileImage = action.payload.profileImage;
      state.gender = action.payload.gender;
    },
    clearUser: (state) => {
      state.name = "";
      state.id = "";
      state.isLogin = false;
    },
    changeUser(state, action) {
      state.nickname = action.payload.nickname;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
    },
    changeEmotion(state, action) {
      state.emotion.push(action.payload);
    },
  },
});

const initialCounselorState = { counselor: undefined, subject: undefined };

let counselSlice = createSlice({
  name: "counsel",
  initialState: initialCounselorState,
  reducers: {
    selectCounselor(state, action) {
      console.log("in store");
      console.log(action.payload);
      state.counselor = action.payload;
    },
    selectSubject(state, action) {
      console.log("in subject store");
      state.subject = action.payload;
      console.log(state.subject);
    },
  },
});

export let { loginUser, changeEmotion, changeUser, deleteEmotion, clearUser } =
  user.actions;
export let { loginCounselor } = counselor.actions;
export const counselActions = counselSlice.actions;

export default configureStore({
  reducer: {
    counselor: counselor.reducer,
    user: user.reducer,
    counsel: counselSlice.reducer,
  },
});
