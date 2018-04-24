import React, { Component } from 'react';
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
    let authed = this.stitchClient.isAuthenticated();
    let logout = () => this.stitchClient.logout().then(() => window.location.reload());
    return (
      <div>
        {authed
          ? <div className="login-header">
              {this.state.userData && this.state.userData.picture
                ? <img src={this.state.userData.picture} className="profile-pic" />
                : null}
              <span className="login-text">
                <span className="username">
                  {this.state.userData && this.state.userData.name ? this.state.userData.name : "?"}
                </span>
              </span>
              <div>
                <a className="logout" href="#" onClick={() => logout()}>
                  sign out
                </a>
              </div>
              <div>
                <a className="settings" href="/settings">settings</a>
              </div>
            </div>
          : null}
        {!authed
          ? <div className="login-links-panel">
              <div
                onClick={() => this.stitchClient.authenticate("google")}
                className="signin-button"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </g>
                </svg>
                <span className="signin-button-text">Sign in with Google</span>
              </div>
              <div
                onClick={() => this.stitchClient.authenticate("facebook")}
                className="signin-button"
              >
                <div className="facebook-signin-logo" />
                <span className="signin-button-text">
                  Sign in with Facebook
                </span>
              </div>
            </div>
          : null}
      </div>
    );
  }
};

export default AuthControls;
