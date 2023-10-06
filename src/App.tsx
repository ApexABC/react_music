import React, { memo, Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './store/modules/player'
const App = memo((props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(1496089152))
  }, [])
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter></AppFooter>

      {/* 播放工具栏 */}
      <AppPlayerBar></AppPlayerBar>
    </div>
  )
})
App.displayName = 'App'
export default App
