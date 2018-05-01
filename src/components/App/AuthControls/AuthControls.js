import React, { Component } from 'react';
import LoginHeader from './LoginHeader';
import LoginLinksPanel from './LoginLinksPanel';
import { Route, Switch, Redirect } from 'react-router'
import './AuthControls.css';

class AuthControls extends Component {
  constructor(props){
    super(props)
    this.state = {userData:null}
    this.stitchClient = props.stitchClient;
  }

  componentDidMount() {
    if (this.stitchClient.isAuthenticated()) {
      this.stitchClient.userProfile()
      .then(userData=>{
        this.setState({userData:userData.data})
      })
    }
  }

  render() {
    let isAuthed = this.stitchClient.isAuthenticated();
    let logout = () => this.stitchClient.logout().then(() => window.location.href="/");
    const { userData } = this.state;
    let onOAuthGoogle = () => this.stitchClient.authenticate("google");
    let onOAuthFB = () => this.stitchClient.authenticate("facebook");

    return (
      <AuthControlsWithLoginHeader
        isAuthed={isAuthed}
        onLogout={logout}
        userData={userData}
        onOAuthGoogle={onOAuthGoogle}
        onOAuthFB={onOAuthFB}
      />
    );
  }
};

const withLoginHeader = (Component) =>
  ({isAuthed, ...rest}) =>
    isAuthed
    ? <LoginHeader {...rest} />
    : <Switch>
      <Route exact path='/'render={() => <Component {...rest} />} />
      <Redirect from='/:visibility?' to='/' />
    </Switch>

const AuthControlsWithLoginHeader = withLoginHeader(LoginLinksPanel);

export default AuthControls;
