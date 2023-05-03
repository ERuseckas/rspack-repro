import loadable, {
    DefaultComponent,
    lazy,
    LoadableComponent,
    LoadableLibrary,
  } from "@loadable/component";
  
  type RetryArgs = {
    retries?: number;
    interval?: number;
    exponentialBackoff?: boolean;
  };
  
  const IS_RELOADED_ON_LAZY_LOAD_ERROR = "IS_RELOADED_ON_LAZY_LOAD_ERROR";
  
  function retry<Props>(
    fn: () => Promise<Props>,
    { retries = 3, interval = 500, exponentialBackoff = true }: RetryArgs = {}
  ) {
    return new Promise<Props>((resolve, reject) => {
      const isReloaded =
        sessionStorage.getItem(IS_RELOADED_ON_LAZY_LOAD_ERROR) === "true";
  
      fn()
        .then((component) => {
          sessionStorage.setItem(IS_RELOADED_ON_LAZY_LOAD_ERROR, "false");
          resolve(component);
        })
        .catch((error) => {
          console.error("Symon - retryLazyLoad error", retries, error);
          setTimeout(() => {
            if (retries === 1) {
              if (!isReloaded) {
                sessionStorage.setItem(IS_RELOADED_ON_LAZY_LOAD_ERROR, "true");
                // @ts-ignore true is used by Firefox only, it prevents from using cache. It doesn't have any effect in other browsers
                window.location.reload(true);
              } else {
                reject(error);
              }
            } else {
              retry(fn, {
                retries: retries - 1,
                interval: exponentialBackoff ? interval * 2 : interval,
              }).then(resolve, reject);
            }
          }, interval);
        });
    });
  }
  
  /**
   * Used for lazy loading with a fallback
   * https://loadable-components.com/docs/component-splitting/
   * @param importCallback
   * @param fallback
   * @returns
   */
  export function loadableWithRetry<Props>(
    importCallback: () => Promise<DefaultComponent<Props>>,
    fallback?: React.ReactElement
  ): LoadableComponent<Props> {
    return fallback
      ? loadable(() => retry(importCallback), { fallback })
      : loadable(() => retry(importCallback));
  }
  
  /**
   * Used for components loaded inside React.suspense
   * https://loadable-components.com/docs/suspense/
   * @param importCallback
   * @returns
   */
  export function lazyLoadWithRetry<Props>(
    importCallback: () => Promise<DefaultComponent<Props>>
  ): LoadableComponent<Props> {
    return lazy(() => retry(importCallback));
  }
  
  /**
   * Used for lazy loading libraries
   * https://loadable-components.com/docs/library-splitting/
   * @param importCallback
   * @returns
   */
  export function lazyLoadLibraryWithRetry<Props, Module>(
    importCallback: () => Promise<Module>
  ): LoadableLibrary<Module> {
    return loadable.lib(() => retry(importCallback));
  }
  