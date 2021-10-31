import React, { memo } from "react";

import { getPlayCount } from "@/utils/handle-song";
import { parseImageUrl } from "@/utils/parse-url";

import { ThemeCoverWrapper } from "./style";

function ThemeCover(props) {
  const { info, marginRight } = props;

  return (
    <ThemeCoverWrapper marginRight={marginRight}>
      <div className="cover-top">
        <img src={parseImageUrl(info.picUrl || info.coverImgUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {getPlayCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      <div className="cover-source">
        by {info.copywriter || info.creator.nickname}
      </div>
    </ThemeCoverWrapper>
  );
}

export default memo(ThemeCover);
