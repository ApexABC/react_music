import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { NewAlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
import AlbumItemV1 from '@/components/album-item-v1'
interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = (props) => {
  const { newAlbum } = useAppSelector(
    (state) => ({
      newAlbum: state.discover.newAlbum
    }),
    shallowEqualApp
  )
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  function handlePreClick() {
    console.log('pre')
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    console.log('next')
    bannerRef.current?.next()
  }
  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" morePath="/discover/album"></AreaHeaderV1>
      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={handlePreClick}></button>
        <div className="album">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="album-list">
                  {newAlbum.slice(item * 5, (item + 1) * 5).map((item) => {
                    return <AlbumItemV1 key={item.id} itemData={item} />
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" onClick={handleNextClick}></button>
      </div>
    </NewAlbumWrapper>
  )
}

NewAlbum.displayName = 'NewAlbum'
export default memo(NewAlbum)
