
// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';
import { xAxisData } from 'constants/chartData';
import * as dependParam from '../../dependParam';
import * as chooseSettings from 'constants/chartSettings';

const Option = Select.Option;

class X extends Component {
  static propTypes = {

  };

  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.xDataChange = this.xDataChange.bind(this);
  }

  // 更改维度
  xDataChange(key) {
    const { chooseConfig, chooseChartType } = this.context.chart.toJS();
    const xConfig = [];
    xConfig[0] = 'xyAxis';
    xConfig[1] = 'X';
    xConfig[2] = key;
    const MixConfig = ['xyAxis', 'Mix', ''];
    const activeType = chooseChartType;
    const Y = chooseConfig.xyAxis.Y;
    if (chooseSettings.chartEspecialData.indexOf(activeType) !== -1 && Y !== '') {
      const legend = dependParam.dpLegend(activeType, key, Y);
      this.context.chartActions.changeChooseLegend(legend);
    }
    const series = dependParam.dpSeries(activeType, key, Y);
    this.context.chartActions.changexChooseXAxis(key);
    this.context.chartActions.changeChooseSeries(series);
    this.context.chartActions.changeChooseOneConfig(xConfig);
    this.context.chartActions.changeChooseOneConfig(MixConfig);
  }

  render() {
    const { chooseConfig } = this.context.chart.toJS();
    const xyAxisX = chooseConfig.xyAxis.X;

    // 可选的维度
    const xDatas = xAxisData.map(xData => <Option key={xData}>{xData}</Option>);

    return (
      <div className="chartChoose-item">
        <div className="chartChoose-item-title">X 轴：</div>
        <Select
          value={xyAxisX}
          style={{ width: 140 }}
          onChange={this.xDataChange}
        >
          {xDatas}
        </Select>
      </div>
    );
  }
}

export default X;
