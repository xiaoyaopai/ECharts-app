import * as at from 'constants/actionTypes';
import { fromJS } from 'immutable';
import * as chooseData from 'constants/chartData';

const INITIAL_STATE = fromJS({
  editorOption: {
    title: {
      text: '衣服',
    },
    tooltip: {},
    legend: {
      show: true,
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    }],
  },
  chooseOption: {
    legend: {
      show: true,
      data: [],
    },
    series: [],
  },
  chooseConfig: {},
  chooseChartType: '',
});

export default function chart(state = INITIAL_STATE, action) {
  switch (action.type) {
    // 隐藏 ECharts 组件的 Legend
    case at.HIDE_ECHARTS_LEGEND:
      return state.updateIn([action.closeLegend[0], 'legend', 'show'], () => action.closeLegend[1]);
    // Editor 组件更改 option
    case at.CHANGE_EDITOR_OPTION:
      return state.update('editorOption', () => action.option);
    // Choose 组件更改 type
    case at.CHANGE_CHOOSE_CHARTTYPE:
      return state.update('chooseChartType', () => action.cType);
    // Choose 组件更改 option
    case at.CHANGE_CHOOSE_OPTION:
      return state.update('chooseOption', () => fromJS(action.option));
    // Choose 组件更改 config
    case at.CHANGE_CHOOSE_CONFIG:
      return state.update('chooseConfig', () => fromJS(action.config));
    // Choose 组件更改 config 的一个配置项
    case at.CHANGE_CHOOSE_ONECONFIG:
      return state.updateIn(['chooseConfig', action.oneConfig[0], action.oneConfig[1]], () => action.oneConfig[2]);
    // Choose 组件更改 Legend
    case at.CHANGE_CHOOSE_LEGEND:
      return state.updateIn(['chooseOption', 'legend', 'data'], () => action.legend);
    // Choose 组件更改 xAxis
    case at.CHANGE_CHOOSE_XAXIS:
      return state.updateIn(['chooseOption', 'xAxis', 'data'], () => chooseData.getX[action.xAxis]);
    // Choose 组件更改 series
    case at.CHANGE_CHOOSE_SERISE:
      return state.updateIn(['chooseOption', 'series'], () => fromJS(chooseData.seriesData(action.series[0], action.series[1], action.series[2], action.series[3])));
    // Choose 组件更改 series 的 type
    case at.CHANGE_CHOOSE_LEGENDTYPE:
      // return state.updateIn(['chooseOption', 'series'], (series) => {
      //   let tmp = series;
      //   for (let i = action.lType[0]; i < action.lType[0] + action.lType[1]; i++) {
      //     tmp = tmp.updateIn([i, 'type'], () => fromJS(action.lType[2]));
      //   }
      //   return tmp;
      // });
      return state.updateIn(['chooseOption', 'series'], series => (
        series.splice(
          action.lType[0],
          action.lType[1],
          ...series
            .slice(action.lType[0], action.lType[0] + action.lType[1])
            .map(serie => serie.update('type', () => action.lType[2]))
        )
      ));
    // Choose 组件更改饼图的 Radius
    case at.CHANGE_CHOOSE_RADIUS:
      return state.updateIn(['chooseOption', 'series', 0, 'radius', action.radius[0]], () => action.radius[1]);
    default:
      return state;
  }
}
