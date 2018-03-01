// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

// import Main from 'containers/Main';
import Foo from 'containers/Foo';
import MyECharts from 'containers/MyECharts';

export function createRoutes() {
  return {
    path: '/',
    // component: Main,
    component: Foo,
    indexRoute: { component: MyECharts },
    childRoutes: [
      { path: 'MyECharts', component: MyECharts },
    ],
  };
}
