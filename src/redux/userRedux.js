import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSecretId",
  initialState: {
    userSecretId: null,
    currentPlaylist: { originalName: "test.m3u", listname: "test" },
    playlist: [],
    isFetching: false,
    error: false,
  },
  reducers: {

    getUserSecretIdStart: (state) => {
      state.isFetching = true;
    },
    getUserSecretIdSuccess: (state, action) => {
      state.isFetching = false;
      state.userSecretId = action.payload;
    },
    getUserSecretIdFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPlaylistStart: (state) => {
      state.isFetching = true;
    },
    getPlaylistSucccess: (state, action) => {
      state.isFetching = false;
      state.playlist.push(action.payload);
    },
    getPlaylistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCurrentPlaylistStart: (state) => {
      state.isFetching = true;
    },
    getCurrentPlaylistSucccess: (state, action) => {
      state.isFetching = false;
      state.currentPlaylist = action.payload;
    },
    getCurrentPlaylistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteCurrentPlaylistSucccess: (state) => {
      state.isFetching = false;
      state.currentPlaylist = null;
    },

  },
});

export const {
  getPlaylistFailure,
  getPlaylistStart,
  getPlaylistSucccess,
  getUserSecretIdFailure,
  getUserSecretIdStart,
  getUserSecretIdSuccess,
  getCurrentPlaylistFailure,
  getCurrentPlaylistStart,
  getCurrentPlaylistSucccess,

  deleteCurrentPlaylistSucccess,
} = userSlice.actions;
export default userSlice.reducer;
