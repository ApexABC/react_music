import React, { memo, useRef, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, BarWrapper } from './style'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { formatImg, formatTime } from '@/utils/format'
import { getPlayerUrl } from '@/utils/handlePlayer'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction,
  changePlaySongIndex
} from '@/store/modules/player'
import { objIsEmpty } from '@/utils/judgeObj'
interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = (props) => {
  const { currentSong, songLyric, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      songLyric: state.player.songLyric,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState('')
  const [isSliedrChanging, setIsSliChanging] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = getPlayerUrl(currentSong.id)
    audioRef.current
      .play()
      .then(() => {
        console.log('播放成功')
        setIsPlaying(true)
      })
      .catch((err) => {
        console.log('播放失败:', err)
        setIsPlaying(false)
      })
    setDuration(currentSong.dt)
  }, [currentSong])
  function handlePlayClick() {
    const isPaused = audioRef.current!.paused
    isPaused ? audioRef.current?.play().catch(() => setIsPlaying(false)) : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }
  function handleTimeUpdate() {
    const currentTime = (audioRef.current?.currentTime as number) * 1000
    if (!isSliedrChanging) {
      const progress = (currentTime / duration) * 100
      setCurrent(formatTime(Math.floor(currentTime / 1000)))
      setProgress(progress)
    }
    // 匹配歌词
    let index = songLyric.length - 1
    for (let i = 0; i < songLyric.length; i++) {
      const lyric = songLyric[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    if (index === lyricIndex || index === -1) return
    dispatch(changeLyricIndexAction(index))
    message.open({
      content: songLyric[index].text,
      duration: 0,
      key: 'lyric'
    })
  }
  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      dispatch(changeMusicAction(true))
    }
  }
  function handleSliderChanging(value: number) {
    setIsSliChanging(true)
    setProgress(value)
    setCurrent(formatTime(Math.floor(duration / 1000) * (value / 100)))
  }
  function handleSliderChanged(value: number) {
    if (audioRef.current) audioRef.current.currentTime = Math.floor(duration / 1000) * (value / 100)
    setIsSliChanging(false)
  }
  function handleChangeModeClick() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }
  function handleChangeSong(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }
  return (
    <BarWrapper className="sprite_playbar">
      {!objIsEmpty(currentSong) && (
        <div className="content wrap-v2">
          <BarControl $isPlaying={isPlaying}>
            <button
              className="btn sprite_playbar prev"
              onClick={() => handleChangeSong(false)}
            ></button>
            <button className="btn sprite_playbar play" onClick={handlePlayClick}></button>
            <button className="btn sprite_playbar next" onClick={() => handleChangeSong()}></button>
          </BarControl>
          <BarPlayInfo>
            <Link to={'/player'}>
              <img className="image" src={formatImg(currentSong.al.picUrl)} alt="" />
            </Link>
            <div className="info">
              <div className="song">
                <span className="song-name">{currentSong?.name}</span>
                <span className="singer-name">{currentSong?.ar[0]?.name}</span>
              </div>
              <div className="progress">
                <Slider
                  value={progress}
                  onChange={handleSliderChanging}
                  onAfterChange={handleSliderChanged}
                  step={0.5}
                  tooltip={{ formatter: null }}
                />
                <div className="time">
                  <span className="current">{current}</span>
                  <span className="divider">/</span>
                  <span className="duration">{formatTime(duration / 1000)}</span>
                </div>
              </div>
            </div>
          </BarPlayInfo>
          <BarOperator $playMode={playMode}>
            <div className="left">
              <button className="btn sprite_playbar favor"></button>
              <button className="btn sprite_playbar share"></button>
            </div>
            <div className="right sprite_playbar">
              <button className="btn sprite_playbar volume"></button>
              <button className="btn sprite_playbar loop" onClick={handleChangeModeClick}></button>
              <button className="btn sprite_playbar playlist"></button>
            </div>
          </BarOperator>
        </div>
      )}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleTimeEnded}></audio>
    </BarWrapper>
  )
}

AppPlayerBar.displayName = 'AppPlayerBar'
export default memo(AppPlayerBar)
