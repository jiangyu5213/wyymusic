import React, { memo } from "react";

import { parseImageUrl } from "@/utils/parse-url";

import { AlbumCoverWrapper } from "./style";

function AlbumCover(props) {
  const { info, size = 130, width = 153, bgPosition = "-845px" } = props;

  return (
    <AlbumCoverWrapper width={width} bgPosition={bgPosition} size={size}>
      <div className="album-image">
        <img src={parseImageUrl(info.picUrl, size)} alt={info.name} />
        <a href="/discover/recommend" className="no-link image_cover cover">
          {info.name}
        </a>
      </div>
      <div className="album-name text-nowrap">{info.name}</div>
      <div className="artist text-nowrap">{info.artist.name}</div>
    </AlbumCoverWrapper>
  );
}

export default memo(AlbumCover);
