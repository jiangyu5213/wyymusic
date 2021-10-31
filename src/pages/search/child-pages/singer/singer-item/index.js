import React, { memo } from "react";

import { parseImageUrl } from "@/utils/parse-url";

import { SingerItemWrapper } from "./style";

import propTypes from "prop-types";

function SingerItem(props) {
  // props/state
  const { coverPic, singer } = props;

  const picUrl =
    (coverPic && parseImageUrl(coverPic, 130)) ||
    "https://gitee.com/xmkm/cloudPic/raw/master/img/20210505140847.png";
  return (
    <SingerItemWrapper>
      <div className="cover-pic">
        <img src={picUrl} alt="" />
        <span className="image_cover"></span>
      </div>
      <p className="singer-info">
        <span>{singer}</span>
        <i className="sprite_icon2 singer_icon"></i>
      </p>
    </SingerItemWrapper>
  );
}

SingerItem.propTypes = {
  coverPic: propTypes.string.isRequired,
  singer: propTypes.string.isRequired,
};

export default memo(SingerItem);
