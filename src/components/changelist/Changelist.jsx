import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  _deletelistRequestById,
  _getlistRequest,
} from "../../utils/requestMethodUtils";
import { __useClickOutside } from "../useOutSideClick/useOutSideClick";
import ChannelContext from "../../context/useChannelContext";
import { useNavigate } from "react-router-dom";
import { __deleteCurrentPlaylistBylistNameInRedux } from "../../redux/apiCalls";

function Changelist({ setChangeChannelList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  const user = useSelector((state) => state.user.userSecretId);
  const currentPlaylist = useSelector((state) => state.user.currentPlaylist);
  const { setCurrentlist } = useContext(ChannelContext);

  const [openEditSection, setOpenEditSection] = useState(false);
  const [deletePlaylistChannel, setDeletePlaylistChannel] = useState(null);
  const [m3uplaylist, setM3uplaylist] = useState([]);

  const modalRef = useRef();
  __useClickOutside(modalRef, () => setChangeChannelList(false));

  useEffect(() => {
    _getlistRequest(user?.secretId).then((data) => {
      setM3uplaylist(data);
    });
  }, []);

  const handleChooseChannelPlaylist = (o) => {
    setCurrentlist(o);
    if (o) {
      navigate("/tv");
      setChangeChannelList(false);
    }
  };

  const handleDeleteChannelPlaylist = (o) => {
    _deletelistRequestById(o._id).then((data) => {
      setDeletePlaylistChannel(data);
      if (currentPlaylist?.listname === o?.listname) {
        __deleteCurrentPlaylistBylistNameInRedux(dispatch);
      }
    });
  };

  useEffect(() => {
    if (deletePlaylistChannel) {
      const timer = setTimeout(() => {
        setDeletePlaylistChannel(null);
        setChangeChannelList(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [deletePlaylistChannel]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
   
      <div
        ref={modalRef}
        className="w-full max-w-4xl h-[500px] bg-[#0f172a]/70 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/20 pb-3">
          <div className="flex items-center  gap-3">
            <h2 className="font-semibold text-lg">Choose/Edit Your Playlist</h2>
          </div>
          <button
            onClick={() => setOpenEditSection((prev) => !prev)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-10 py-5 rounded-lg"
          >
            Edit
            <img src={ASSETS + "/edit.png"} alt="" className="w-4 h-4" />
          </button>
        </div>

        {/* Playlist list */}
        <div className=" overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 flex flex-wrap gap-4 p-2">
          {m3uplaylist.map((o) => (
            <Fragment key={o._id}>
              <button
                onClick={() => handleChooseChannelPlaylist(o)}
                className="flex items-center gap-3 border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition "
              >
                <img
                  src={ASSETS + "/filesIcon.png"}
                  alt="playlistIcon"
                  className="w-6 h-6"
                />
                <span className="text-white font-medium tracking-wide">
                  {o.listname.toUpperCase()}
                </span>
              </button>
              {openEditSection && (
                <button
                  onClick={() => handleDeleteChannelPlaylist(o)}
                  className="text-red-500 hover:text-red-300 transition"
                >
                  <img
                    src={ASSETS + "/remove2.png"}
                    alt="remove"
                    className="w-6 h-6"
                  />
                </button>
              )}
            </Fragment>
          ))}
        </div>

        {/* Delete success message */}
        {deletePlaylistChannel && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 border border-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-bounce">
            <img src={ASSETS + "/success.png"} alt="" className="w-5 h-5" />
            <span>M3U File Deleted Successfully!</span>
          </div>
        )}
      </div>
   
    </motion.div>
    </AnimatePresence>
  );
}

export default Changelist;
