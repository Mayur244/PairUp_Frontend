import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [], 
  },
  reducers: {
    setMessageHistory: (state, action) => {
      state.messages = action.payload; 
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); 
    },
    clearMessages: (state) => {
      state.messages = []; 
    },
  },
});

export const { setMessageHistory, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
