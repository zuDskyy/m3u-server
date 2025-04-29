// AddM3uList.jsx
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { __useClickOutside } from "../useOutSideClick/useOutSideClick";
import { motion, AnimatePresence } from "framer-motion";
import CustomInput from "../customInput/CustomInput";

const AddM3uList = ({ setAddChannelOpen }) => {
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  const user = useSelector((state) => state.user.userSecretId);
  const [m3uFile, setM3uFile] = useState(null);
  const [m3uFileName, setM3uFileName] = useState("");
  const [m3uUploadFileSuccessfully, setM3uUploadFileSuccessfully] =
    useState(null);

  const outClickRef = useRef();
  __useClickOutside(outClickRef, () => setAddChannelOpen(false));

  const handleM3uListFile = (e) => {
    const file = e.target.files[0];
    setM3uFile(file);
    if (file && file.type !== "audio/x-mpegurl") {
      alert("Please select a valid M3U file.");
      e.target.value = null;
      setM3uFile(null);
    }
  };

  const handleSubmitUploadM3uFile = async (e) => {
    e.preventDefault();
    if (m3uFile) {
      const datafile = new FormData();
      datafile.append("name", Date.now() + user?.secretId + m3uFileName + ".m3u");
      datafile.append("file", m3uFile);

      try {
        const res = await axios.post(
          `https://m3u-server.onrender.com/api/upload/m3ufile?secret_id=${user?.secretId}&list_name=${m3uFileName}`,
          datafile
        );
        setM3uUploadFileSuccessfully(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (m3uUploadFileSuccessfully) {
      setTimeout(() => {
        setM3uUploadFileSuccessfully(null);
        setAddChannelOpen(false);
      }, 2000);
    }
  }, [m3uUploadFileSuccessfully]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          ref={outClickRef}
          onSubmit={handleSubmitUploadM3uFile}
          className="bg-[#0f172a]/70  p-10 rounded-2xl w-[90%] max-w-md shadow-2xl flex flex-col gap-6 relative text-white"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <h2 className="text-2xl font-semibold text-center mb-2">➕ Add M3U Playlist</h2>

          <CustomInput
            label="Playlist Name"
            type="text"
            id="playlistName"
            onChange={(e) => setM3uFileName(e.target.value)}
            className="w-full rounded-lg p-3 bg-white text-black"
          />

          <div className="w-full">
            <label className="block mb-1">M3U File</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={m3uFile?.name || ""}
                readOnly
                className="flex-1 rounded-lg p-3 bg-white text-black"
              />
              <label
                htmlFor="file"
                className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800"
              >
                Browse
              </label>
              <input
                type="file"
                id="file"
                accept=".m3u"
                hidden
                onChange={handleM3uListFile}
              />
            </div>
          </div>

          {m3uUploadFileSuccessfully && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black px-4 py-2 rounded-lg flex items-center gap-2 border border-green-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={`${ASSETS}/success.png`} alt="Success" className="w-5 h-5" />
              <span>M3U File Uploaded Successfully!</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="mt-4 bg-white text-indigo-700 font-semibold py-2 rounded-lg transition hover:bg-gray-100"
          >
            Upload Playlist
          </button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddM3uList;
