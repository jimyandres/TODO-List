import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAll } from '../../actionCreators';
import './index.css';

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
    const { checkAll } = this.state;

    let arrowClass = "arrow ";
    arrowClass +=  checkAll ? "checked" : "";

    return (
      <div className="Header">
        <button className={arrowClass} onClick={() => this.onClickCheckAll()}>
          <svg width="30px" height="20px" viewBox="0 0 30 15">
            <polyline
              fill="none"
              stroke="#00ABCC"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,0 15,15 30,0"
            />
          </svg>
        </button>
        {children}
      </div>
    );
  };
}
Header = connect()(Header);

export default Header;
