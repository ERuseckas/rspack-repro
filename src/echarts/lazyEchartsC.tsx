import * as React from "react";
import { loadableWithRetry } from "../utils/retryLazyLoad";

export const LazyEchartsC = loadableWithRetry(
  () => import(/* webpackPrefetch: true */ "./echartsC"),
  <div>Loading...</div>
);
