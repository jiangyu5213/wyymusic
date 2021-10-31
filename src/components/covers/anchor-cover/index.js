import React, { memo } from "react";

import { parseImageUrl } from "@/utils/parse-url";

import { AnchorCoverWrapper } from "./style";

function AnchorCover(props) {
  const { info } = props;
  return (
    <AnchorCoverWrapper>
      <div className="artist-image">
        <img src={parseImageUrl(info.avatarUrl, 40)} alt="" />
      </div>
      <div className="artist-info">
        <a href={`/#/user/home?id=${info.id}`} className="artist-name">
          {info.nickName}
        </a>
        {/* <a href={info.url} className="artist-detail text-nowrap">
          {info.nickName}
        </a> */}
      </div>
    </AnchorCoverWrapper>
  );
}

export default memo(AnchorCover);
