if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import { injectAsyncReducer } from 'store';


export default function createRoutes(store) {
  return {
    path: 'myecharts',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer(store, 'myecharts', require('./reducer').default);

        cb(null, require('./MyECharts').default);
      });
    },
  };
}
