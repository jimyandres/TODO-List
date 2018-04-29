import React from 'react';
import './App.css';

import AuthControls from './AuthControls';
import AppTitle from './AppTitle';
import AppBody from './AppBody';
import Footer from './Footer';

const App = (props) =>
  <div className="App">
    {
      props.stitchClient.isAuthenticated() ?
      <div >
        <AuthControls {...props}/>
        <div className="TodoApp">
          <AppTitle />
          <AppBody {...props} />
          <Footer {...props} />
        </div>
      </div>
      : <div>
        <AppTitle />
        <AuthControls {...props}/>
      </div>
    }
  </div>

export default App;
