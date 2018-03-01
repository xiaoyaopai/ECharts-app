
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Header from './components/Header';

function mapStateToProps(state) {
  return {
    state: state.foo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Foo extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className={style.foo}>
        <Header />
        <div className={style['foo-body']}>{this.props.children}</div>
      </div>
    );
  }
}

export default Foo;
