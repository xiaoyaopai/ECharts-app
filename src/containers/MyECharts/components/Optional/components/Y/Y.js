
// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';
import { yAxisData } from 'constants/chartData';
import * as dependParam from '../../dependParam';

const Option = Select.Option;

class Y extends Component {
  static propTypes = {

  };

  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.yDataChange = this.yDataChange.bind(this);
  }

  // 更改度量
  yDataChange(key) {
    const { chooseConfig, chooseChartType } = this.context.chart.toJS();
    const activeType = chooseChartType;
    const X = chooseConfig.xyAxis.X;
    const yConfig = [];
    yConfig[0] = 'xyAxis';
    yConfig[1] = 'Y';
    yConfig[2] = key;
    const MixConfig = ['xyAxis', 'Mix', ''];
    this.context.chartActions.changeChooseOneConfig(yConfig);
    this.context.chartActions.changeChooseOneConfig(MixConfig);
    const legend = dependParam.dpLegend(activeType, X, key);
    const series = dependParam.dpSeries(activeType, X, key);
    this.context.chartActions.changeChooseLegend(legend);
    this.context.chartActions.changeChooseSeries(series);
  }

  render() {
    const { chooseConfig } = this.context.chart.toJS();
    const xyAxisY = chooseConfig.xyAxis.Y;

    // 所有可选度量
    const yDatas = yAxisData.map(yData => <Option key={yData}>{yData}</Option>);

    return (
      <div className="chartChoose-item">
        <div className="chartChoose-item-title">Y 轴：</div>
        <Select
          value={xyAxisY}
          style={{ width: 140 }}
          onChange={this.yDataChange}
        >
          {yDatas}
          <Option key="全部">全部</Option>
        </Select>
      </div>
    );
  }
}

export default Y;
