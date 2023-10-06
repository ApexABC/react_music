import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppSelector } from '@/store'
import { HotRecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import SectionItemV1 from '@/components/section-item-v1'
interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = (props) => {
  const { hotRecommends } = useAppSelector(
    (state) => ({
      hotRecommends: state.discover.hotRecommend
    }),
    shallowEqualApp
  )
  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        morePath="/discover/songs"
      />
      <div className="recommend-list">
        {hotRecommends.map((item) => {
          return <SectionItemV1 info={item} key={item.id} />
        })}
      </div>
    </HotRecommendWrapper>
  )
}

HotRecommend.displayName = 'HotRecommend'
export default memo(HotRecommend)
