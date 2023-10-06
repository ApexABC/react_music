import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppSelector } from '@/store'
import { SettleWrapper } from './style'
import SectionHeaderV2 from '@/components/section-header-v2'
import { formatImg } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers } = useAppSelector(
    (state) => ({
      settleSingers: state.discover.settleSingers
    }),
    shallowEqualApp
  )

  return (
    <SettleWrapper>
      <SectionHeaderV2 title="入驻歌手" morePath="/discover/artist" />
      <div className="singer-list">
        {settleSingers.map((item) => {
          return (
            <a href="/singer" key={item.id} className="item">
              <img src={formatImg(item.img1v1Url)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                <div className="desc">{item.alias.join('') || item.name}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleWrapper>
  )
}

export default memo(SettleSinger)
