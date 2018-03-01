/* eslint-disable */
// 数据
const data = [
  {
    "date": "17-01",
    "region": "四川",
    'count': 17,
    'sales': 65797,
    'else': 7192.9259259259
  },
  {
    "date": "17-01",
    "region": "北京",
    'count': 17,
    'sales': 74199,
    'else': 4877.7777777778
  },
  {
    "date": "17-01",
    "region": "杭州",
    'count': 15,
    'sales': 64489,
    'else': 4960
  },
  {
    "date": "17-02",
    "region": "四川",
    'count': 15,
    'sales': 62088,
    'else': 13042.234532
  },
  {
    "date": "17-02",
    "region": "北京",
    'count': 13,
    'sales': 68326,
    'else': 9093.04347826087
  },
  {
    "date": "17-02",
    "region": "杭州",
    'count': 11,
    'sales': 62426,
    'else': 12761.904761904763
  },
  {
    "date": "17-03",
    "region": "四川",
    'count': 11,
    'sales': 56294,
    'else': 3133.333333333332
  },
  {
    "date": "17-03",
    "region": "北京",
    'count': 11,
    'sales': 55270,
    'else': 14138.095238095237
  },
  {
    "date": "17-03",
    "region": "杭州",
    'count': 10,
    'sales': 39101,
    'else': 12870.43
  },
  {
    "date": "17-04",
    "region": "四川",
    'count': 11,
    'sales': 48336,
    'else': 5909.21
  },
  {
    "date": "17-04",
    "region": "北京",
    'count': 13,
    'sales': 53146,
    'else': 21702
  },
  {
    "date": "17-04",
    "region": "杭州",
    'count': 10,
    'sales': 43036,
    'else': 29491.8483
  },
];
/* eslint-enable */

// 获取一个维度的所有值
const getDimension = dimension => Array.from(new Set(data.map(x => x[dimension])));

/* eslint no-param-reassign: ["error", { "props": false }] */
// 获取一个维度对应的一个度量的值
const getMetric = (dimension, metric) => {
  const obj = data.reduce((acc, cur) => {
    const dim = cur[dimension];
    const met = cur[metric];
    if (dim in acc) {
      acc[dim] += met;
    } else {
      acc[dim] = met;
    }
    return acc;
  }, {});
  return Object.keys(obj).map(x => obj[x]);
};

// 获取特殊型图表当前维度的下一个维度的一个度量的值
const getEspecialMetric = (dimension, dimension2, dimensionValue, metric) => {
  const obj = data.reduce((acc, cur) => {
    const dim = cur[dimension];
    const dim2 = cur[dimension2];
    const met = cur[metric];
    if (dim2 === dimensionValue) {
      acc[dim] = met;
    }
    return acc;
  }, {});
  return Object.keys(obj).map(x => obj[x]);
};

// 所有维度
export const xAxisData = ['date', 'region'];
// 所有度量
export const yAxisData = ['count', 'sales', 'else'];

// 获取所有维度的所有值
const getdate = getDimension('date');
const getRegion = getDimension('region');
export const getX = {
  date: getdate,
  region: getRegion,
};

// 获取所有维度对应的所有度量的值
const getdateCount = getMetric('date', 'count');
const getdateSales = getMetric('date', 'sales');
const getdateelse = getMetric('date', 'else');
const getRegionCount = getMetric('region', 'count');
const getRegionSales = getMetric('region', 'sales');
const getRegionelse = getMetric('region', 'else');
export const getY = {
  date: {
    count: getdateCount,
    sales: getdateSales,
    else: getdateelse,
  },
  region: {
    count: getRegionCount,
    sales: getRegionSales,
    else: getRegionelse,
  },
};

// 获取 series 中的所有数据
export const seriesData = (xAxis, xAxis2, yAxis, seriesType) => {
  if (xAxis === null) {
    return [];
  }
  if (xAxis2 === null) {
    return yAxis.map(legend => ({ name: legend, type: seriesType, data: getY[xAxis][legend] }));
  }
  return yAxis.map((currentValue, index, array) => {
    if (array.length === 1) {
      return getX[xAxis2].map(legend => (
        {
          name: legend,
          type: seriesType,
          data: getEspecialMetric(xAxis, xAxis2, legend, currentValue),
        }
      ));
    }
    return getX[xAxis2].map(legend => (
      { name: `${legend}-${currentValue}`, type: seriesType, data: getEspecialMetric(xAxis, xAxis2, legend, currentValue) }
    ));
  }).reduce((acc, val) => acc.concat(val), []);
};
