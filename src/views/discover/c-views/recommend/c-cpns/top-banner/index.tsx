import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { BannerControl, BannerLeft, BannerRight, TopBannerWrapper } from './style'
import { useAppSelector, shallowEqualApp } from '@/store'
import { Carousel } from 'antd'
import classNames from 'classnames'
interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = (props) => {
  const { bannerList } = useAppSelector(
    (state) => ({
      bannerList: state.discover.bannerList
    }),
    shallowEqualApp
  )
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  function prevClick() {
    bannerRef.current?.prev()
  }
  function nextClick() {
    bannerRef.current?.next()
  }
  const [curImg, setCurImg] = useState(0)
  function handleAfterChange(cur: number, newIndex: number) {
    setCurImg(newIndex)
  }
  const bgimg = bannerList[curImg] && bannerList[curImg].imageUrl + '?imageView&blur=40x20'

  return (
    <TopBannerWrapper $bgImage={bgimg}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            ref={bannerRef}
            beforeChange={handleAfterChange}
            effect="fade"
            autoplay
            autoplaySpeed={2000}
            speed={300}
            dots={false}
          >
            {bannerList &&
              bannerList.map((item: any) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })}
          </Carousel>
          <ul className="dots">
            {bannerList &&
              bannerList.map((item, index) => {
                return (
                  <li key={item.imageUrl}>
                    <span
                      className={classNames('item', {
                        active: curImg === index
                      })}
                    ></span>
                  </li>
                )
              })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={prevClick}></button>
          <button className="btn right" onClick={nextClick}></button>
        </BannerControl>
      </div>
    </TopBannerWrapper>
  )
}

TopBanner.displayName = 'TopBanner'
export default memo(TopBanner)
