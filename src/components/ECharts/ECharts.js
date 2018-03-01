
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import echarts from 'echarts';
import Legend from 'components/Legend';

class ECharts extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
  };

  static contextTypes = {
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      myChart: null,
    };
  }

  componentDidMount() {
    const { name, options } = this.props;
    const chartID = `${name}Chart`;
    const closeLegend = [`${name}Option`];
    this.state.myChart = echarts.init(document.getElementById(chartID), 'vintage');
    this.state.myChart.setOption(options);
    closeLegend[1] = false;
    this.context.chartActions.hideEChartsLegend(closeLegend);
  }

  componentWillReceiveProps(nextProps) {
    const { myChart } = this.state;
    myChart.setOption(nextProps.options, { notMerge: true });
  }

  render() {
    const { name, options } = this.props;
    const { myChart } = this.state;
    const chartID = `${name}Chart`;

    return (
      <div className={style.echarts}>
        <Row type="flex" justify="space-between" align="top">
          <Col span={21}>
            <div id={chartID} style={{ height: 400 }}>echarts</div>
          </Col>
          <Col span={3}>
            <Legend name={name} chart={myChart} option={options} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ECharts;
