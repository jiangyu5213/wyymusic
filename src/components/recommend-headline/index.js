import React, { memo } from "react";

import { HeaderlineWrapper } from "./style";

function RecHeaderline(props) {
  const { titleSlot, rightSlot } = props;
  return (
    <HeaderlineWrapper>
      <div className="hot-artist">{titleSlot}</div>
      <a href="/discover/recommend" className="no-link show-all">
        {rightSlot}
      </a>
    </HeaderlineWrapper>
  );
}

export default memo(RecHeaderline);
