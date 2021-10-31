import React, { memo } from "react";

import { shallowEqual, useSelector } from "react-redux";

import { CommentHeadlineLeft, CommentHeadlineWrapper } from "./style";

import propTypes from "prop-types";

function CommentHeadline(props) {
  const { title } = props;

  const { commentTotal } = useSelector(
    (state) => ({
      commentTotal: state.getIn(["songPlayer", "currentCommentTotal"]),
    }),
    shallowEqual
  );

  return (
    <CommentHeadlineWrapper>
      <CommentHeadlineLeft>
        <h2 className="hot-title">
          <a href="/discover/recommend" className="no-link hot-text">
            {title}
          </a>
        </h2>
        {commentTotal && <span>共{commentTotal}条评论</span>}
      </CommentHeadlineLeft>
    </CommentHeadlineWrapper>
  );
}

CommentHeadline.propTypes = {
  title: propTypes.string.isRequired,
};

CommentHeadline.defaultProps = {
  keywords: [],
};

export default memo(CommentHeadline);
