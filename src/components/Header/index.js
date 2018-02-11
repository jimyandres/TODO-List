import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAll } from '../../actionCreators';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkAll: false
    };

    this.onClickCheckAll = this.onClickCheckAll.bind(this);
  }

  onClickCheckAll() {
    const {dispatch} = this.props;
    this.setState((prevState) => {
      dispatch(checkAll(!prevState.checkAll));
      return {checkAll: !prevState.checkAll}
    });
  };

  render () {
    const { children } = this.props;

    return (
      <di>
        <input type="checkbox" onClick={() => this.onClickCheckAll()} /> Check ALl
        {children}
      </di>
    );
  };
}
Header = connect()(Header);

export default Header;
