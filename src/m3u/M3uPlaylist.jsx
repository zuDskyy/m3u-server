import React, { useContext, useEffect, useState } from 'react'
import Channel from '../components/channel.js/Channel'
import '../styles/m3uplayer.css'
import M3uPlayer from './M3uPlayer'
import ChannelContext from '../context/useChannelContext'
import { m3uParserByRegEx } from '../utils/m3uFormUtils'
import { useDispatch, useSelector } from 'react-redux'
import { __getCurrentPlaylistBylistNameWidthRedux, __getUserSecretIdWithRedux } from '../redux/apiCalls'
import ChannelSidebar from '../components/sidebar-channel'
import ChannelSlider from '../components/channel-slider'

const M3uPlaylist = () => {
  const dispatch = useDispatch();
  const [m3uData, setM3uData] = useState([]);
  const [currentChannelList, setCurrentChannelList] = useState(null);
  const currentPlaylist = useSelector(state => state.user.currentPlaylist);
  const user = useSelector(state => state.user.userSecretId)


  useEffect(() => {
    m3uParserByRegEx(currentPlaylist).then(data => setM3uData(data));

  }, [currentPlaylist])


  useEffect(() => {
    if (currentChannelList !== null) {
      __getCurrentPlaylistBylistNameWidthRedux(dispatch, currentChannelList);
    }
    ;
  }, [currentChannelList])

  //userSecretId
  useEffect(() => {
    __getUserSecretIdWithRedux(dispatch, user?.secretId)
  }, [!user?.secretId])

  const m3uDataContext = {
    m3uData,
    setCurrentlist: setCurrentChannelList,
  }


  return (
    <div>
      <div className="m3uplaylist">
        <ChannelContext.Provider value={m3uDataContext}>
          <Channel />
          <div className='flex flex-col md:flex-row '>
            <ChannelSidebar drawerOpen={true} />
            <M3uPlayer />
          </div>
        
        </ChannelContext.Provider>

      </div>

    </div>
  )
}

export default M3uPlaylist

