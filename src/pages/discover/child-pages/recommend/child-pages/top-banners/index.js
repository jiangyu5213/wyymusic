import React, { memo, useState, useRef, useEffect, useCallback } from "react";

// redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopBannersAction } from "../../store/actionCreator";

import { Carousel } from "antd";

import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from "./style";

function TopBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerRef = useRef()

  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(["recommend", "topBanners"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopBannersAction());
  }, [dispatch]);

  const bgImage =
    topBanners &&
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";

  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner w980">
        <BannerLeft>
          <Carousel
            effect="fade"
            autoplay={true}
            ref={bannerRef}
            beforeChange={bannerChange}
            dots={true}
          >
            {topBanners &&
              topBanners.map((item) => {
                return (
                  <div key={item.imageUrl}>
                    {/* 后期加上点击 banner 跳转到相关单曲页面的功能，歌曲id：item.targetId */}
                    <img src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                );
              })}
          </Carousel>
        </BannerLeft>
        <BannerRight />
        <BannerControl>
          <button
            className="btn"
            onClick={() => bannerRef.current.prev()}
          ></button>
          <button
            className="btn"
            onClick={() => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
}

export default memo(TopBanners);
