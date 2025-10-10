const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
  name: "search",
  initialState: {
    videos: [],
  },
  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
    },
  },
});

export const { cacheResults, setVideos, clearVideos } = searchSlice.actions;
export default searchSlice.reducer;
