import { configureStore, createSlice } from '@reduxjs/toolkit'

let counselor = createSlice({
    name: 'counselor',
    initialState: {
      id: '',
      pw: '',
    },
    reducers: {
      loginCounselor: (state, action)=> {       
          state.name = action.payload.name;
          state.id = action.payload.id;
          state.isLoggined = true;

      },
      clearCounselor: (state) => {
        state.name = "";
        state.id = "";
        state.isLogin = false;
      },
    }
})

let user = createSlice({
    name: 'user',
    initialState: {
      "email": "",
      "nickname": "",
      "age": "",
      "gender": "",
      "emotion" : {},
      "profileImage": 0
   },
    reducers: {

      changeUser(state, action) {
        state.nickname = action.payload.nickname;
        state.age = action.payload.age;
        state.gender = action.payload.gender
      },
      changeEmotion(state, action) {
        state.emotion.push(action.payload)
      },
      loginUser: (state, action)=> {       
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.isLoggined = true;

      },
      clearUser: (state) => {
        state.name = "";
        state.id = "";
        state.isLogin = false;
      },
    }
})

export let { loginUser, changeEmotion, changeUser } = user.actions
export let { loginCounselor } = counselor.actions

export default configureStore({
  reducer: { 
    counselor: counselor.reducer,
    user: user.reducer,
  }
}) 