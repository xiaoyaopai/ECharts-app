
import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

class Legend extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    chart: PropTypes.object,
    option: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    const { name } = this.props;
    const legendULID = `${name}legendUL`;
    const ulNode = document.getElementById(legendULID);
    ulNode.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        this.onToggleLegend(e.target.dataset.legend);
        e.target.classList.toggle('legend-done');
      }
    });
  }

  componentWillReceiveProps() {
    const liCollection = document.getElementsByClassName('legend-li');
    for (let i = 0; i < liCollection.length; i++) {
      if (liCollection.item(i).classList.contains('legend-done')) {
        liCollection.item(i).classList.remove('legend-done');
      }
    }
  }

  onToggleLegend(name) {
    const { chart } = this.props;
    chart.dispatchAction({
      type: 'legendToggleSelect',
      name,
    });
  }

  render() {
    const { option, name } = this.props;

    const legendULID = `${name}legendUL`;

    // 自定义 Legend
    const legends = option.legend.data.map((legend, index) => {
      const arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
      const arrIndex = index % 11;
      const liclassName = `legend-${arr[arrIndex]}`;
      return (
        <li key={index} data-legend={legend} className={classnames(liclassName, 'legend-li')}>
          {legend}
        </li>
      );
    });

    return (
      <div>
        <ul id={legendULID} className={style['legend-ul']}>
          {legends}
        </ul>
      </div>
    );
  }
}

export default Legend;
