
import React, { Component, PropTypes } from 'react';

class ElseCharts extends Component {
  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        以其它组件渲染图表
      </div>
    );
  }
}

export default ElseCharts;
