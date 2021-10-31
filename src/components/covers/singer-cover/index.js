import React, { memo } from "react";

import { parseImageUrl } from "@/utils/parse-url";

import { SingerCoverWrapper } from "./style";

function SingerCover(props) {
  const { info } = props;
  return (
    <SingerCoverWrapper href={info.detail} target="_blank">
      <div className="image">
        <img src={parseImageUrl(info.picUrl, 62)} alt="" />
      </div>
      <div className="singer-title">
        <div className="text-nowrap singer-name">{info.name}</div>
        <div className="text-nowrap singer-detail">流行歌手</div>
      </div>
    </SingerCoverWrapper>
  );
}

export default memo(SingerCover);
