
// 图表类型
export const chartTypeData = ['柱状图', '并列柱状图', '折线图', '环形图'];

// series TYPE
export const seriesTypeData = ['bar', 'line'];

// 图表 series 的 TYPE
export const chartSeriesTypeData = {
  柱状图: 'bar',
  并列柱状图: 'bar',
  折线图: 'line',
  环形图: 'pie',
  其他图表: 'else',
};

// 特殊型图表
export const chartEspecialData = [
  '并列柱状图',
];

// 含 X，Y 轴的 option
const xyOption = {
  title: {
    text: 'DATA FROM SPARK OF XY',
  },
  tooltip: {},
  legend: {
    show: false,
    data: [],
  },
  xAxis: {
    data: [],
  },
  yAxis: {},
  series: [],
};

const pieOption = {
  title: {
    text: 'DATA FROM SPARK OF PIE',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    show: false,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center',
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' },
      ],
    },
  ],
};

const elseOption = {
  title: '其他图表',
};

// 图表 option
export const chartOption = {
  柱状图: xyOption,
  并列柱状图: xyOption,
  折线图: xyOption,
  环形图: pieOption,
  其他图表: elseOption,
};

// 图表 config
export const chartConfig = ['x, y 轴：', '圆：', '其它'];
