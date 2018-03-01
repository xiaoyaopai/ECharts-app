
import { xAxisData, yAxisData, getX } from 'constants/chartData';
import * as chooseSettings from 'constants/chartSettings';

const legend = [];  // 储存 legend 的数组
const yAxis = [];   // 储存度量的数组
const series = [];  // 储存 series 参数的数组

// 特殊图表的 xAxis：当前维度的下一个维度
export const dpEspecialX = (X) => {
  if (X === '') {
    return null;
  }
  return xAxisData.indexOf(X) === xAxisData.length - 1 ?
  xAxisData[0] : xAxisData[xAxisData.indexOf(X) + 1];
};

// 特殊图表的 legend：在下一个维度的所有值后面加上度量标志
export const dpEspecialY = (X, Y) => (
  Y.map(legend0 => getX[dpEspecialX(X)].map(legend1 => `${legend1}-${legend0}`)).reduce((acc, val) => acc.concat(val), [])
);

// 返回正确的 Legend：一个度量 || 全部度量 || 下一个维度的所有值
export const dpLegend = (activeType, X, Y) => {
  legend.length = 0;
  if (chooseSettings.chartEspecialData.indexOf(activeType) === -1) {
    if (Y === '全部') {
      for (const y of yAxisData) {
        legend.push(y);
      }
    } else {
      legend[0] = Y;
    }
  } else {
    for (const y of (Y === '全部' ? dpEspecialY(X, yAxisData) : getX[dpEspecialX(X)])) {
      legend.push(y);
    }
  }
  return legend;
};

// 返回 Series 需要的参数： 当前维度，下一个维度（可以为null），度量，图表类型
export const dpSeries = (activeType, X, Y) => {
  series[0] = X;
  if (chooseSettings.chartEspecialData.indexOf(activeType) === -1) {
    series[1] = null;
  } else {
    series[1] = dpEspecialX(X);
  }
  yAxis.length = 0;
  if (Y === '全部') {
    for (const y of yAxisData) {
      yAxis.push(y);
    }
  } else {
    yAxis[0] = Y;
  }
  series[2] = yAxis;
  series[3] = chooseSettings.chartSeriesTypeData[activeType];
  return series;
};
