import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  reqArtistList,
  reqBannerList,
  reqHotRecommend,
  reqNewAlbum,
  reqPlayListDetail
} from '@/service'
export const fetchDiscoverDataAction = createAsyncThunk('discover', (arg, { dispatch }) => {
  reqBannerList().then((res) => {
    dispatch(getBannerList(res.banners))
  })
  reqHotRecommend().then((res) => {
    dispatch(getHotRecommend(res.result))
  })
  reqNewAlbum().then((res) => {
    dispatch(getNewAlbum(res.albums))
  })
  const rankingIds = [19723756, 3779629, 2884035]
  const promises: Promise<any>[] = []
  rankingIds.forEach((item) => {
    promises.push(reqPlayListDetail(item))
  })
  Promise.all(promises).then((res) => {
    const playlists = res.filter((item) => item.playlist).map((item) => item.playlist)
    dispatch(getRankings(playlists))
  })
  reqArtistList().then((res) => {
    dispatch(getSettleSingers(res.artists))
  })
})
interface RecommendState {
  bannerList: any[]
  hotRecommend: any[]
  newAlbum: any[]
  rankings: any[]
  settleSingers: any[]
}
const initialState: RecommendState = {
  bannerList: [],
  hotRecommend: [],
  newAlbum: [],
  rankings: [],
  settleSingers: []
}
const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    getBannerList(state, { payload }) {
      state.bannerList = payload
    },
    getHotRecommend(state, { payload }) {
      state.hotRecommend = payload
    },
    getNewAlbum(state, { payload }) {
      state.newAlbum = payload
    },
    getRankings(state, { payload }) {
      state.rankings = payload
    },
    getSettleSingers(state, { payload }) {
      state.settleSingers = payload
    }
  }
})
export const { getBannerList, getHotRecommend, getNewAlbum, getRankings, getSettleSingers } =
  discoverSlice.actions
export default discoverSlice.reducer
