
// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChartActions from './actions';
import { Row, Col, Tabs } from 'antd';
import Title from 'components/Title';
import Editor from './components/Editor';
import Choose from './components/Choose';

function mapStateToProps(state) {
  const { chart } = state;
  return { chart };
}

function mapDispatchToProps(dispatch) {
  return {
    chartActions: bindActionCreators(ChartActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class MyECharts extends Component {
  static propTypes = {
    chart: PropTypes.object.isRequired,
    chartActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  getChildContext() {
    const { chart, chartActions } = this.props;
    return { chart, chartActions };
  }

  render() {
    const TabPane = Tabs.TabPane;

    return (
      <div>
        <Title title="My ECharts" />
        <Row>
          <Col span={20} offset={2}>
            <Tabs type="card">
              <TabPane tab="Editor" key="1">
                <Editor />
              </TabPane>
              <TabPane tab="Choose" key="2">
                <Choose />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyECharts;
