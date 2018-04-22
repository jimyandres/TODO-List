import React from 'react';
import './App.css';

import AuthControls from './AuthControls';
import AppTitle from './AppTitle';
import AppBody from './AppBody';
import Footer from './Footer';

const App = (props) =>
  <div className="App">
    <AuthControls {...props}/>
    {
      props.stitchClient.isAuthenticated() ?
      <div>
        <AppTitle />
        <AppBody {...props} />
        <Footer />
      </div>
      : null
    }
  </div>

export default App;
