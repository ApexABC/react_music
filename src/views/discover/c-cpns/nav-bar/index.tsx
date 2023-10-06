import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { NavBarWrapper } from './style'
import { discoverMenu } from '@/assets/data/local-data'
interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = (props) => {
  return (
    <NavBarWrapper>
      <div className="top">
        <div className="nav wrap-v2">
          {discoverMenu.map((item) => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {item.title}
                </NavLink>
              </div>
            )
          })}
        </div>

        {/* <Link to={'/discover/recommend'}>推荐</Link>
        <Link to={'/discover/ranking'}>排行榜</Link>
        <Link to={'/discover/songlist'}>歌单</Link>
        <Link to={'/discover/djradio'}>主播电台</Link>
        <Link to={'/discover/artist'}>歌手</Link>
        <Link to={'/discover/newalbum'}>新碟上架</Link> */}
      </div>
    </NavBarWrapper>
  )
}

NavBar.displayName = 'NavBar'
export default memo(NavBar)
