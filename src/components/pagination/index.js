import React, { memo } from "react";

import { Pagination } from "antd";

import { PaginationWrapper } from "./style";


function AppPagination(props) {
  const { currentPage, total, onPageChange } = props;

  const itemRender = (type, originalElement) => {
    if (type === "prev") {
      return <button className="control prev">&lt; 上一页</button>;
    } else if (type === "next") {
      return <button className="control next">下一页 &gt;</button>;
    }
    return originalElement;
  };

  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={35}
        showSizeChanger={false}
        // itemRender={itemRender}
        onChange={onPageChange}
      ></Pagination>
    </PaginationWrapper>
  );
}

export default memo(AppPagination);
