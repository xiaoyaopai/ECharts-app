
import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';

class Title extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'Title-blue',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className, style.title)}>
        <Row>
          <Col span={20} offset={2}>
            <h1 className={style['title-text']}>{this.props.title}</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Title;
