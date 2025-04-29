import axios from "axios";
import userRedux, {
  getPlaylistFailure,
  getPlaylistStart,
  getPlaylistSucccess,
  getUserSecretIdFailure,
  getUserSecretIdStart,
  getUserSecretIdSuccess,
  getCurrentPlaylistFailure,
  getCurrentPlaylistStart,
  getCurrentPlaylistSucccess,

  deleteCurrentPlaylistSucccess
} from "./userRedux";


export const __getUserSecretIdWithRedux = async (dispatch, secretId) => {
  dispatch(getUserSecretIdStart());
  try {
    const res = await axios.get(`https://m3u-server.onrender.com/api/user/secretId?secret_id=${secretId}`)
    dispatch(getUserSecretIdSuccess(res.data));
  } catch (err) {
    dispatch(getUserSecretIdFailure())
  }
}

export const __getPlaylistBySecretIdWithRedux = async (dispatch, secretId) => {
  dispatch(getPlaylistStart());
  try {
    const res = await axios.get('https://m3u-server.onrender.com/api/m3u/playlists' + secretId);
    dispatch(getPlaylistSucccess(res.data));
  } catch (err) {
    dispatch(getPlaylistFailure());
  }

}


export const __getCurrentPlaylistBylistNameWidthRedux = async (dispatch, listname) => {
  dispatch(getCurrentPlaylistStart());
  try {
    dispatch(getCurrentPlaylistSucccess(listname));
  } catch (err) {
    dispatch(getCurrentPlaylistFailure());
  }

}


export const __deleteCurrentPlaylistBylistNameInRedux = async (dispatch) => {
  dispatch(deleteCurrentPlaylistSucccess());

}

