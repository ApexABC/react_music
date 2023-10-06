import { reqSongDetail, reqSongLyric } from '@/service/modules/player'
import { formatLyric } from '@/utils/format'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState } from '..'
export const fetchCurrentSongAction = createAsyncThunk<void, number, { state: IRootState }>(
  'currentSong',
  (songId: number, { dispatch, getState }) => {
    // 如果播放列表里有，则进入播放列表
    const playSongList = getState().player.playSongList
    const findIndex = playSongList.findIndex((item) => item.id === songId)
    if (findIndex === -1) {
      reqSongDetail(songId).then((res) => {
        if (!res.songs.length) return
        const song = res.songs[0]
        const newPlaySongList = [...playSongList]
        newPlaySongList.push(song)
        dispatch(getSongDetail(song))
        dispatch(changePlaySongList(newPlaySongList))
        dispatch(changePlaySongIndex(newPlaySongList.length - 1))
      })
    } else {
      const song = playSongList[findIndex]
      dispatch(getSongDetail(song))
      dispatch(changePlaySongIndex(findIndex))
    }
    // reqSongDetail(songId).then((res) => {
    //   dispatch(getSongDetail(res.songs[0]))
    // })
    reqSongLyric(songId).then((res) => {
      const lyric = res.lrc.lyric
      dispatch(getSongLyric(formatLyric(lyric)))
    })
  }
)
export const changeMusicAction = createAsyncThunk<void, boolean, { state: IRootState }>(
  'changeMusic',
  (isNext, { dispatch, getState }) => {
    const playMode = getState().player.playMode
    const songIndex = getState().player.playSongIndex
    const songList = getState().player.playSongList
    let newIndex = songIndex
    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲循环和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex < 0) newIndex = songList.length - 1
      if (newIndex > songList.length - 1) newIndex = 0
    }
    const song = songList[newIndex]
    dispatch(getSongDetail(song))
    dispatch(changePlaySongIndex(newIndex))
    reqSongLyric(song.id).then((res) => {
      const lyric = res.lrc.lyric
      dispatch(getSongLyric(formatLyric(lyric)))
    })
  }
)
interface PlayerState {
  currentSong: any
  songLyric: any[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: PlayerState = {
  currentSong: {},
  songLyric: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: 'I Really Want to Stay At Your House',
      id: 1496089152,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 28096830,
          name: 'Rosa Walton',
          tns: [],
          alias: []
        },
        {
          id: 37531921,
          name: 'Hallie Coggins',
          tns: [],
          alias: []
        }
      ],
      alia: ['网络动画《赛博朋克：边缘行者》插曲'],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 16,
      crbt: null,
      cf: '',
      al: {
        id: 98418475,
        name: 'Cyberpunk 2077: Radio, Vol. 2 (Original Soundtrack)',
        picUrl: 'https://p2.music.126.net/tshh9Uwf_ao_YFJMQTnM0Q==/109951165476489856.jpg',
        tns: [],
        pic_str: '109951165476489856',
        pic: 109951165476489860
      },
      dt: 246652,
      h: {
        br: 320000,
        fid: 0,
        size: 9868845,
        vd: -47246,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5921325,
        vd: -44685,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3947565,
        vd: -43202,
        sr: 48000
      },
      sq: {
        br: 1058463,
        fid: 0,
        size: 32634101,
        vd: -47241,
        sr: 48000
      },
      hr: {
        br: 1829300,
        fid: 0,
        size: 56400233,
        vd: -47245,
        sr: 48000
      },
      a: null,
      cd: '01',
      no: 5,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 537141248,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 16,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 704010,
      mv: 0,
      publishTime: 1608220800000
    },
    {
      name: 'Empty Love',
      id: 1435828582,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 1115185,
          name: 'Lulleaux',
          tns: [],
          alias: []
        },
        {
          id: 34704316,
          name: 'Kid Princess',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 24,
      crbt: null,
      cf: '',
      al: {
        id: 87122489,
        name: 'Empty Love (feat. Kid Princess)',
        picUrl: 'https://p1.music.126.net/xrWSChs7pIOWFjOz5eQIzw==/109951164855840145.jpg',
        tns: [],
        pic_str: '109951164855840145',
        pic: 109951164855840140
      },
      dt: 170314,
      h: {
        br: 320000,
        fid: 0,
        size: 6814868,
        vd: -59301,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4088938,
        vd: -56803,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 2725973,
        vd: -55330,
        sr: 44100
      },
      sq: {
        br: 997578,
        fid: 0,
        size: 21237727,
        vd: -59314,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 270336,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 24,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mv: 0,
      mst: 9,
      cp: 1416676,
      publishTime: 1588176000000,
      tns: ['虚无之爱']
    },
    {
      name: '5AM',
      id: 1307398848,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12061182,
          name: 'Total Ape',
          tns: [],
          alias: []
        },
        {
          id: 896217,
          name: 'Nico & Vinz',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 7,
      crbt: null,
      cf: '',
      al: {
        id: 72986192,
        name: 'In a Haze',
        picUrl: 'https://p2.music.126.net/l-ul-Sha8uGD3iVBl5Fn4A==/109951163537453265.jpg',
        tns: [],
        pic_str: '109951163537453265',
        pic: 109951163537453260
      },
      dt: 216031,
      h: {
        br: 320002,
        fid: 0,
        size: 8643440,
        vd: -73651,
        sr: 44100
      },
      m: {
        br: 192002,
        fid: 0,
        size: 5186081,
        vd: -71097,
        sr: 44100
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3457402,
        vd: -69565,
        sr: 44100
      },
      sq: {
        br: 1042462,
        fid: 0,
        size: 28150525,
        vd: -73638,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 270336,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 7,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7002,
      mv: 0,
      publishTime: 1536249600000
    }
  ],
  playSongIndex: -1,
  playMode: 0 //0顺序 1随机 2单曲循环
}
export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    getSongDetail(state, { payload }) {
      state.currentSong = payload
    },
    getSongLyric(state, { payload }) {
      state.songLyric = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndex(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongList(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  getSongDetail,
  getSongLyric,
  changeLyricIndexAction,
  changePlaySongIndex,
  changePlaySongList,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
