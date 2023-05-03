import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadableWithRetry } from "./utils/retryLazyLoad";

const AppCAsync = loadableWithRetry(
  // @ts-ignore
  () => import(/* webpackPrefetch: true */ "./appC")
);
const MobilePageCAsync = loadableWithRetry(
  // @ts-ignore
  () => import(/* webpackPrefetch: true */ "./mobilePageC")
);

export const IndexRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<MobilePageCAsync />} />
        <Route path="*" element={<AppCAsync />} />
      </Routes>
    </BrowserRouter>
  );
};
