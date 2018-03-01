
import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import * as dependOption from './dependOption';
import * as chartSettings from 'constants/chartSettings';

class Optional extends Component {
  static propTypes = {
    activeType: PropTypes.string,
  };

  static contextTypes = {
    chart: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { chooseConfig } = this.context.chart.toJS();

    const xyAxiss = (chooseConfig.xyAxis ? Object.keys(chooseConfig.xyAxis) : [])
    .map((config, index) => React.createElement(dependOption[`${config}`], { key: index }));
    const pies = (chooseConfig.pie ? Object.keys(chooseConfig.pie) : [])
    .map((config, index) => React.createElement(dependOption[`${config}`], { key: index }));
    const elses = (chooseConfig.else ? Object.keys(chooseConfig.else) : [])
    .map((config, index) => React.createElement(dependOption[`${config}`], { key: index }));

    const optionalItems = [xyAxiss, pies, elses];
    const liItems = optionalItems.map((item, index) => {
      if (item.length !== 0) {
        return (
          <div key={index}>
            <div className={classnames('chartChoose-item', 'grey-text')}>{chartSettings.chartConfig[index]}</div>
            {item}
          </div>
        );
      }
      return null;
    });

    return (
      <div className={style.chartChoose}>
        {liItems}
      </div>
    );
  }
}

export default Optional;
