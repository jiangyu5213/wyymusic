import React, { memo } from "react";

import { renderRoutes } from "react-router-config";

// 导入其他组件
import AppHeaderNavBar from "@/components/app-header-navbar";

// 导入其他函数
// import { useChangeDropBoxState, useGlobalKeyboardEvent } from '@/hooks/change-state'

import { HeaderCategory } from "./style";

function Discover(props) {
  const { route } = props;

  // 全局注册 ctrl + k 唤醒下拉框
  //   useGlobalKeyboardEvent();

  return (
    // <HeaderCategory onClick={useChangeDropBoxState()}>
    <HeaderCategory>
      {/* 导航栏 */}
      <AppHeaderNavBar />
      {renderRoutes(route.routes)}
    </HeaderCategory>
  );
}

export default memo(Discover);
