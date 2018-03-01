
// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Select, Radio } from 'antd';
import { yAxisData, getX } from 'constants/chartData';
import * as chooseSettings from 'constants/chartSettings';
import * as dependParam from '../../dependParam';

const Option = Select.Option;

const lType = [];  // 储存 type 参数的数组

class Mix extends Component {
  static propTypes = {

  };

  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.yChooseChange = this.yChooseChange.bind(this);
    this.yTypeChange = this.yTypeChange.bind(this);
  }

  // 更改需要自定义 type 的度量
  yChooseChange(key) {
    const MixConfig = ['xyAxis', 'Mix', [key, '']];
    this.context.chartActions.changeChooseOneConfig(MixConfig);
  }

  // 自定义当前度量的类型
  yTypeChange(e) {
    const { chooseConfig, chooseChartType } = this.context.chart.toJS();
    const Y = chooseConfig.xyAxis.Y;
    const X = chooseConfig.xyAxis.X;
    const xyAxisLegend = chooseConfig.xyAxis.Mix[0];
    const curLegendType = e.target.value;
    const MixConfig = ['xyAxis', 'Mix', [xyAxisLegend, curLegendType]];
    const isSpecial = chooseSettings.chartEspecialData.indexOf(chooseChartType) !== -1;
    const start = yAxisData.indexOf(xyAxisLegend);
    const time = getX[dependParam.dpEspecialX(X)].length;
    const timeJudge = Boolean(Y === '全部' && isSpecial);
    const startJudge = Y === '全部' ? start : 0;
    const specialJudge = isSpecial ? time : 1;
    lType[0] = timeJudge ? start * time : startJudge;
    lType[1] = timeJudge ? time : specialJudge;
    lType[2] = curLegendType;
    this.context.chartActions.changeChooseLegendType(lType);
    this.context.chartActions.changeChooseOneConfig(MixConfig);
  }

  render() {
    const { chooseConfig } = this.context.chart.toJS();
    const Y = chooseConfig.xyAxis.Y;
    const xyAxisLegend = chooseConfig.xyAxis.Mix[0];
    const xyAxislType = chooseConfig.xyAxis.Mix[1];

    // 可选 type 的度量
    const yDatasTypesChoose = (Y === '全部' ? yAxisData : new Array(Y)).map(yDatasType => (
      <Option key={yDatasType}>{yDatasType}</Option>
    ));
    // 可选的 type
    const seriesTypes = chooseSettings.seriesTypeData.map(seriesType => (
      <Radio.Button key={seriesType} value={seriesType}>{seriesType}</Radio.Button>
    ));

    return (
      <div className="chartChoose-item">
        <div className="chartChoose-item-title">度量：</div>
        <Select
          value={xyAxisLegend}
          style={{ width: 138 }}
          onChange={this.yChooseChange}
        >
          {yDatasTypesChoose}
        </Select>
        <div style={{ paddingTop: 8 }}>
          <div className="chartChoose-item-title">类型：</div>
          <Radio.Group value={xyAxislType} onChange={this.yTypeChange}>
            {seriesTypes}
          </Radio.Group>
        </div>
      </div>
    );
  }
}

export default Mix;
