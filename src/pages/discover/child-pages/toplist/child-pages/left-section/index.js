import React, { memo, Fragment } from "react";

import { NavLink } from "react-router-dom";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeCurrentIndexAction,
  changeCurrentToplistIdAction,
} from "../../store/actionCreator";

import { parseImageUrl } from "@/utils/parse-url";

import { ToplistLeftSecWrapper } from "./style";

import propTypes from "prop-types";

function ToplistLeftSection(props) {
  const { toplistInfo } = props;

  const { currentIndex } = useSelector(
    (state) => ({
      currentIndex: state.getIn(["toplist", "currentIndex"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const clickItem = (e, index, id) => {
    e.preventDefault();
    dispatch(changeCurrentToplistIdAction(id));
    dispatch(changeCurrentIndexAction(index));
    props.history.push(`/discover/toplist?id=${id}`);
  };

  return (
    <ToplistLeftSecWrapper>
      {toplistInfo.map((item, index) => {
        return (
          <Fragment key={item.id}>
            <h3 style={{ marginTop: index === 4 ? "17px" : "" }}>
              {index === 0 ? "云音乐特色榜" : index === 4 ? "全球媒体榜" : ""}
            </h3>
            <NavLink
              className={"info " + (index === currentIndex ? "bg" : "")}
              onClick={(e) => clickItem(e, index, item.id)}
              to={{ pathname: `/discover/toplist`, search: `?id=${item.id}` }}
            >
              <div className="image">
                <img src={parseImageUrl(item.coverImgUrl, 44)} alt="" />
              </div>
              <div className="info-right">
                <div className="info-title">{item.name}</div>
                <div className="info-update">{item.updateFrequency}</div>
              </div>
            </NavLink>
          </Fragment>
        );
      })}
    </ToplistLeftSecWrapper>
  );
}

ToplistLeftSection.propTypes = {
  selected: propTypes.bool,
};

ToplistLeftSection.defaultProps = {
  selected: true,
};

export default memo(ToplistLeftSection);
