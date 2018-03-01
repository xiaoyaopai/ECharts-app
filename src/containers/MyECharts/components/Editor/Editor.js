
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'antd';
import AceEditor from 'react-ace';
import ECharts from 'components/ECharts';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends Component {
  static contextTypes = {
    chart: PropTypes.object,
    chartActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      // Editor 组件中的字符串：格式化
      code: JSON.stringify({
        title: {
          text: '衣服',
        },
        tooltip: {},
        legend: {
          show: false,
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        }],
      }, null, '\t'),
    };
  }

  handleChange(newValue) {
    this.setState({ code: newValue });
  }

  handleOk() {
    this.context.chartActions.changeEditorOption(JSON.parse(this.state.code));
  }

  render() {
    const { code } = this.state;
    const { editorOption } = this.context.chart.toJS(); // EChart 组件需要的 option

    return (
      <div className={style.editor}>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={10}>
            <Button onClick={this.handleOk}>Run</Button>
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.handleChange}
              value={code}
              name="ECHARTS_EDITOR"
              editorProps={{ $blockScrolling: true }}
              height="450px"
              width="100%"
              className={style['ace-editor']}
            />
          </Col>
          <Col span={12}>
            <ECharts name="editor" options={editorOption} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Editor;
