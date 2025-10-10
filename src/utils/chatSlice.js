const { createSlice } = require("@reduxjs/toolkit");
const LIVE_CHAT_COUNT = 20;

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const newMessages = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      // Combine old + new, then keep only last MAX_VISIBLE_MESSAGES
      state.messages = [...state.messages, ...newMessages].slice(
        -LIVE_CHAT_COUNT
      );
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

//when live data is polled, an action will be dispatched which will call reducer function which will update slice of our store. Live chat container is subscribed to redux store and hence will keep on updating UI
