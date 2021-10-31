import React, { memo, useEffect, useRef } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getNewAlbumsAction } from "../../store/actionCreator";

// 其他组件
import { Carousel } from "antd";
import RecommendNavBar from "@/components/recommend-navbar";
import AlbumCover from "@/components/covers/album-cover";

import { NewAlbumsWrapper } from "./style";

function NewAlbums() {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );

  const albumRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewAlbumsAction());
  }, [dispatch]);

  /* 轮播图布局思路:
        两个页面轮播: 2 page
        在 page 中添加一个个 item
    */
  return (
    <NewAlbumsWrapper>
      <RecommendNavBar title="新碟上架" />
      <div className="content">
        <div className="inner">
          <Carousel dots={false} ref={albumRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {/* item * 5, (item + 1) * 5   第一次遍历 0  5  第二次遍历 5  10  */}
                  {newAlbums &&
                    newAlbums.slice(item * 5, (item + 1) * 5).map((cItem) => {
                      return (
                        <AlbumCover
                          key={cItem.id}
                          info={cItem}
                          size={110}
                          width={110}
                          bgp="-570px"
                        >
                          {cItem.name}
                        </AlbumCover>
                      );
                    })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="sprite_02 arrow arrow-left"
          onClick={(e) => albumRef.current.prev()}
        ></div>
        <div
          className="sprite_02 arrow arrow-right"
          onClick={(e) => albumRef.current.next()}
        ></div>
      </div>
    </NewAlbumsWrapper>
  );
}

export default memo(NewAlbums);
