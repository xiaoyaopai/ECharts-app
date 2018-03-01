if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import { injectAsyncReducer } from 'store';


export default function createRoutes(store) {
  return {
    path: 'foo',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer(store, 'foo', require('./reducer').default);

        cb(null, require('./Foo').default);
      });
    },
  };
}
