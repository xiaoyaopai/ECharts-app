
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Select } from 'antd';
import * as dependChoose from './dependChoose';
import * as chooseSettings from 'constants/chartSettings';
import Optional from '../Optional';
import { configResolve } from './config';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Choose extends Component {
  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.chartTypeChange = this.chartTypeChange.bind(this);
    this.state = {
      chooseType: '',   // 决定以什么组件渲染图表
    };
  }

  // 更改图表类型
  chartTypeChange(key) {
    const splits = key.split(',');
    const type = chooseSettings.chartSeriesTypeData[splits[1]];
    this.context.chartActions.changeChooseChartType(splits[1]);
    this.context.chartActions.changeChooseOption(chooseSettings.chartOption[splits[1]]);
    configResolve(splits[0], type)
    .then(config => this.context.chartActions.changeChooseConfig(config));
    this.setState({
      chooseType: splits[0],
    });
  }

  render() {
    const { chooseOption } = this.context.chart.toJS(); // EChart 组件需要的 option
    const { chooseType } = this.state;

    // 渲染图表的组件
    const charts = chooseType === '' ? null : React.createElement(dependChoose[`${chooseType}`], { name: 'choose', options: chooseOption });
    // 可选的图表类型
    const chartTypes = chooseSettings.chartTypeData.map(type => <Option key={`ECharts,${type}`}>{type}</Option>);

    return (
      <div className={style.choose}>
        <Row type="flex" justify="space-between" align="top">
          <Col span={6}>
            <Select
              style={{ width: 180 }}
              onChange={this.chartTypeChange}
            >
              <OptGroup label="ECharts">
                {chartTypes}
              </OptGroup>
              <OptGroup label="其他类型">
                <Option key="ElseCharts,其他图表">其他图表</Option>
              </OptGroup>
            </Select>
            <Optional />
          </Col>
          <Col span={16}>
            {charts}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Choose;
