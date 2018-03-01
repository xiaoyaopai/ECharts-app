import * as at from 'constants/actionTypes';

// 隐藏 ECharts 组件的 Legend
export function hideEChartsLegend(closeLegend) {
  return {
    type: at.HIDE_ECHARTS_LEGEND,
    closeLegend,
  };
}

// Editor 组件更改 option
export function changeEditorOption(option) {
  return {
    type: at.CHANGE_EDITOR_OPTION,
    option,
  };
}

// Choose 组件更改 type
export function changeChooseChartType(cType) {
  return {
    type: at.CHANGE_CHOOSE_CHARTTYPE,
    cType,
  };
}

// Choose 组件更改 option
export function changeChooseOption(option) {
  return {
    type: at.CHANGE_CHOOSE_OPTION,
    option,
  };
}

// Choose 组件更改 config
export function changeChooseConfig(config) {
  return {
    type: at.CHANGE_CHOOSE_CONFIG,
    config,
  };
}

// Choose 组件更改 config 的一个配置项
export function changeChooseOneConfig(oneConfig) {
  return {
    type: at.CHANGE_CHOOSE_ONECONFIG,
    oneConfig,
  };
}

// Choose 组件更改 Legend
export function changeChooseLegend(legend) {
  return {
    type: at.CHANGE_CHOOSE_LEGEND,
    legend,
  };
}

// Choose 组件更改 xAxis
export function changexChooseXAxis(xAxis) {
  return {
    type: at.CHANGE_CHOOSE_XAXIS,
    xAxis,
  };
}

// Choose 组件更改 series
export function changeChooseSeries(series) {
  return {
    type: at.CHANGE_CHOOSE_SERISE,
    series,
  };
}

// Choose 组件更改 series 的 type
export function changeChooseLegendType(lType) {
  return {
    type: at.CHANGE_CHOOSE_LEGENDTYPE,
    lType,
  };
}

// Choose 组件更改饼图的 Radius
export function changeChooseRadius(radius) {
  return {
    type: at.CHANGE_CHOOSE_RADIUS,
    radius,
  };
}
