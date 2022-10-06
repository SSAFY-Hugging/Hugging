import { configureStore, createSlice } from "@reduxjs/toolkit";

let mission = createSlice({
  name: "mission",
  initialState: { mission: false },
  reducers: {
    changeMission: (state, action) => {
      return (state = { mission: action.payload });
    },
  },
});

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
    emotion: "",
    gender: "",
    profileImage: 0,
    userId: "",
  },
  reducers: {
    userId(state, action) {
      state.userId = action.payload;
    },
    changeImg(state, action) {
      state.profileImage = action.payload;
    },
    changeEmotion(state, action) {
      state.emotion = action.payload;
    },
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
    // changeEmotion(state, action) {
    //   state.emotion.push(action.payload);
    // },
  },
});

const initialNowCounselState = {
  counselorName: undefined,
  counselorId: undefined,
  subject: undefined,
  date: undefined,
  time: undefined,
  gender: undefined,
  profileImage: undefined,
};

// 현재 입장한 상담 정보
let nowCounselSlice = createSlice({
  name: "nowCounsel",
  initialState: initialNowCounselState,
  reducers: {
    setNowCounselorName(state, action) {
      console.log("in counselorName store");
      console.log(action.payload);
      state.counselorName = action.payload;
    },
    setNowCounselorId(state, action) {
      console.log("in counselorId store");
      console.log(action.payload);
      state.counselorId = action.payload;
    },
    setNowSubject(state, action) {
      console.log("in subject store");
      state.subject = action.payload;
      console.log(state.subject);
    },
    setNowDate(state, action) {
      console.log("in date store");
      state.date = action.payload;
      console.log(state.date);
    },
    setNowTime(state, action) {
      console.log("in time store");
      state.time = action.payload;
      console.log(state.time);
    },
    setProfileImage(state, action) {
      console.log("in profile image store");
      state.profileImage = action.payload;
      console.log(state.profileImage);
    },
    setGender(state, action) {
      console.log("in gender store");
      state.gender = action.payload;
      console.log(state.gender);
    },
  },
});

const initialCounselorState = {
  counselorName: undefined,
  counselorId: undefined,
  subject: undefined,
  date: undefined,
  time: undefined,
  subjectKor: undefined,
};

let counselSlice = createSlice({
  name: "counsel",
  initialState: initialCounselorState,
  reducers: {
    selectCounselorName(state, action) {
      console.log("in counselorName store");
      console.log(action.payload);
      state.counselorName = action.payload;
    },
    selectCounselorId(state, action) {
      console.log("in counselorId store");
      console.log(action.payload);
      state.counselorId = action.payload;
    },
    selectSubject(state, action) {
      console.log("in subject store");
      state.subject = action.payload;
      console.log(state.subject);
    },
    selectDate(state, action) {
      console.log("in date store");
      state.date = action.payload;
      console.log(state.date);
    },
    selectTime(state, action) {
      console.log("in time store");
      state.time = action.payload;
      console.log(state.time);
    },
    setSubjectKor(state, action) {
      console.log("in setSubjectKor store");
      state.subjectKor = action.payload;
      console.log(state.subjectKor);
    },
  },
});

export let {
  loginUser,
  changeEmotion,
  changeUser,
  deleteEmotion,
  clearUser,
  changeImg,
  userId,
} = user.actions;
export let { changeMission } = mission.actions;
export let { loginCounselor } = counselor.actions;
export const counselActions = counselSlice.actions;
export const nowCounselActions = nowCounselSlice.actions;

export default configureStore({
  reducer: {
    counselor: counselor.reducer,
    user: user.reducer,
    counsel: counselSlice.reducer,
    mission: mission.reducer,
    nowCounsel: nowCounselSlice.reducer,
  },
});
