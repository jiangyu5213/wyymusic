import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Skeleton } from "antd";

import store from "./store";
import routes from "@/router";
import AppHeader from "@/components/app-header";
import AppWrapper from "@/pages/app";
import AppPlayerBar from '@/components/player-bar'
import AppFooter from "@/components/app-footer";


function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <AppWrapper />
        <Suspense fallback={<Skeleton active />}>
          {routes}
        </Suspense>
        <AppPlayerBar/>
        <AppFooter />
      </HashRouter>
    </Provider>
  );
}

export default memo(App);
