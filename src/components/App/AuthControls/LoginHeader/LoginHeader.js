import React from 'react';

const LoginHeader = ({userData, onLogout}) =>
  <div className="login-header">
    {userData && userData.picture
      ? <img src={userData.picture} className="profile-pic" alt="profile-pic"/>
      : null}
    <span className="login-text">
      <span className="username">
        {userData && userData.name ? userData.name : "?"}
      </span>
    </span>
    <div className="logout" >
      <button className="btn logout" onClick={onLogout}>
        sign out
      </button>
    </div>
  </div>

export default LoginHeader;
