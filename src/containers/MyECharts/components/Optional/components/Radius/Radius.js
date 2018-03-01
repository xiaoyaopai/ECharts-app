
// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class Radius extends Component {
  static propTypes = {

  };

  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.InsideRChange = this.InsideRChange.bind(this);
    this.OuterRChange = this.OuterRChange.bind(this);
  }

  InsideRChange(key) {
    const radius = [0, key];
    this.context.chartActions.changeChooseRadius(radius);
  }

  OuterRChange(key) {
    const radius = [1, key];
    this.context.chartActions.changeChooseRadius(radius);
  }

  render() {
    const { chooseOption } = this.context.chart.toJS();

    const radiusData = [];
    for (let i = 10; i <= 100; i += 10) {
      radiusData.push(i);
    }
    const rDatas = radiusData.map(rData => <Option key={`${rData}%`}>{`${rData}%`}</Option>);

    return (
      <div className="chartChoose-item">
        <div className="chartChoose-item-title">内半径：</div>
        <Select
          defaultValue={chooseOption.series[0].radius[0]}
          style={{ width: 125 }}
          onChange={this.InsideRChange}
        >
          {rDatas}
        </Select>
        <div style={{ paddingTop: 8 }}>
          <div className="chartChoose-item-title">外半径：</div>
          <Select
            defaultValue={chooseOption.series[0].radius[1]}
            style={{ width: 125 }}
            onChange={this.OuterRChange}
          >
            {rDatas}
          </Select>
        </div>
      </div>
    );
  }
}

export default Radius;
