import React, { memo } from "react";

import { NavLink } from "react-router-dom";

import { dicoverLinks } from "@/common/local-data";

import { CategoryList, NavBarWrapper } from "./style";

function AppHeaderNavBar() {
  return (
    <NavBarWrapper>
      <CategoryList className="w1100">
        {dicoverLinks.map((item) => {
          return (
            <li key={item.title} className="item">
              <NavLink to={item.link} activeClassName="menu-active">
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </CategoryList>
    </NavBarWrapper>
  );
}

export default memo(AppHeaderNavBar);
