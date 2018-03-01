import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import main from 'containers/Main/reducer';
import chart from 'containers/MyECharts/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    // main,
    chart,
    routing: routerReducer,
    ...asyncReducers,
  });
}
