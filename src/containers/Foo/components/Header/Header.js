
import style from './style.css';

import React, { Component } from 'react';
import { Row, Col, Menu, Popover, Icon } from 'antd';
import { Link } from 'react-router';

import logo from 'images/logo.png';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.onHidePopover = this.onHidePopover.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.state = {
      visible: false,
    };
  }

  onHidePopover() {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const content = (
      <ul className={style.popover}>
        <li className={style.logoPop}><a href="/" onClick={this.onHidePopover}><img className={style.logo} src={logo} alt="logo" /></a></li>
        <Link to="MyECharts" onClick={this.onHidePopover}><li>My ECharts</li></Link>
      </ul>
    );

    return (
      <Row className={style.header}>
        <Col xs={20} sm={20} md={3} lg={3} offset={2}>
          <h2><a href="/">{'<ECharts />'}</a></h2>
        </Col>
        <Col xs={0} sm={0} md={14} lg={14}>
          <Menu mode="horizontal" className={style.menu}>
            <Menu.Item key="MyECharts"><Link to="MyECharts">My ECharts</Link></Menu.Item>
          </Menu>
        </Col>
        <Col xs={0} sm={0} md={5} lg={5}>
          <a href="https://github.com/FengShangWuQi/ECharts-app" className={style.sideNav} target="_blank" rel="noopener noreferrer">
            <Icon type="star" className={style['icon-star']} />star
          </a>
        </Col>
        <Col xs={2} sm={2} md={0} lg={0}>
          <Popover
            placement="bottomRight"
            content={content}
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            trigger="click"
          >
            <Icon type="bars" className="icon-action" />
          </Popover>
        </Col>
      </Row>
    );
  }
}

export default Header;
