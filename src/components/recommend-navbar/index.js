import React, { memo } from "react";

import {
  RecNavbarLeft,
  RecNavbarRight,
  RecNavbarWrapper,
} from "./style";

import propTypes from "prop-types";

const RecommendNavbar = (props) => {
  const { title, keywords, showIcon, right, keywordsClick } = props;
  return (
    <RecNavbarWrapper showIcon={showIcon}>
      <RecNavbarLeft>
        <h2 className="hot-title">
          <a href="/discover/recommend" className="no-link hot-text">
            {title}
          </a>
        </h2>
        <ul className="keywords">
          {keywords.map((item) => {
            return (
              <li className="item" key={item}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    keywordsClick(item);
                  }}
                >
                  {item}
                </a>
                <span className="line">|</span>
              </li>
            );
          })}
        </ul>
      </RecNavbarLeft>
      <RecNavbarRight>
        <span>{right}</span>
        {showIcon && <i className="icon"></i>}
      </RecNavbarRight>
    </RecNavbarWrapper>
  );
};

RecommendNavbar.propTypes = {
  title: propTypes.string.isRequired,
  keywords: propTypes.array,
  showIcon: propTypes.bool,
  right: propTypes.any,
  keywordsClick: propTypes.func,
};

RecommendNavbar.defaultProps = {
  keywords: [],
  showIcon: true,
  right: "更多",
};

export default memo(RecommendNavbar);
