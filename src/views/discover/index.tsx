import React, { memo, Suspense, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
import { useAppDispatch, useAppSelector, shallowEqualApp } from '@/store'
import { fetchDiscoverDataAction } from '@/store/modules/discover'
interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchDiscoverDataAction())
  }, [])
  // const { bannerList } = useAppSelector(
  //   (state) => ({
  //     bannerList: state.discover.bannerList
  //   }),
  //   shallowEqualApp
  // )
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

Discover.displayName = 'Discover'
export default memo(Discover)
