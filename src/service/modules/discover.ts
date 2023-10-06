import zqRequest from '../config'
export function reqBannerList() {
  return zqRequest.get({
    url: '/banner'
  })
}
export function reqHotRecommend(limit = 8) {
  return zqRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
export function reqNewAlbum() {
  return zqRequest.get({
    url: '/album/newest'
  })
}
export function reqPlayListDetail(id: number) {
  return zqRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
export function reqArtistList(limit = 5) {
  return zqRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
