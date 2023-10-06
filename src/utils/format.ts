export function formatCount(num: number) {
  if (num > 100000000) {
    return Math.floor(num / 100000000) + '亿'
  } else if (num > 100000) {
    return Math.floor(num / 10000) + '万'
  } else {
    return num
  }
}
export function formatImg(url: string) {
  return url + '?param=140x140'
}
export function formatTime(time: number) {
  let m: number | string = Math.floor(time / 60)
  let s: number | string = Math.floor(time % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return m + ':' + s
}
interface ILyric {
  time: number
  text: string
}
export function formatLyric(lyric: string) {
  const lyrics: ILyric[] = []
  const line = lyric.split('\n')
  const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  for (const item of line) {
    const result = reg.exec(item)
    if (!result) continue
    const m = Number(result[1])
    const s = Number(result[2])
    const sm = result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    const time = m * 60 * 1000 + s * 1000 + sm
    const text = item.replace(reg, '')
    lyrics.push({ time, text })
  }
  return lyrics
}
