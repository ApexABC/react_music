import zqRequest from '../config'

export function reqSongDetail(ids: number) {
  return zqRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
export function reqSongLyric(id: number) {
  return zqRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
