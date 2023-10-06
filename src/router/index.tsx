import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
const Discover = lazy(() => import('@/views/discover'))
const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Download = lazy(() => import('@/views/download'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Newalbum = lazy(() => import('@/views/discover/c-views/newalbum'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const SongList = lazy(() => import('@/views/discover/c-views/songlist'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/discover'} />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      { path: '/discover', element: <Navigate to={'/discover/recommend'} /> },
      { path: '/discover/artist', element: <Artist /> },
      { path: '/discover/djradio', element: <Djradio /> },
      { path: '/discover/album', element: <Newalbum /> },
      { path: '/discover/ranking', element: <Ranking /> },
      { path: '/discover/recommend', element: <Recommend /> },
      { path: '/discover/songlist', element: <SongList /> }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
]

export default routes
