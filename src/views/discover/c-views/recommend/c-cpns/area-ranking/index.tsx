import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AreaRankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import TopRankingItem from '@/components/top-ranking-item'
import { shallowEqualApp, useAppSelector } from '@/store'
interface IProps {
  children?: ReactNode
}

const AreaRanking: FC<IProps> = (props) => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.discover.rankings
    }),
    shallowEqualApp
  )
  return (
    <AreaRankingWrapper>
      <AreaHeaderV1 title="榜单" morePath="/discover/ranking" />
      <div className="rankings">
        {rankings &&
          rankings.map((item) => {
            return <TopRankingItem itemData={item} key={item.id} />
          })}
      </div>
    </AreaRankingWrapper>
  )
}

AreaRanking.displayName = 'AreaRanking'
export default memo(AreaRanking)
