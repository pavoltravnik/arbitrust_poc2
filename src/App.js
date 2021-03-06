import React from 'react';
import store from './store';
import { Provider } from 'react-redux';

import './App.css';

import CreateContract from './features/CreateContract';
import { StartArbitration } from './features/StartArbitration';
import { ShowArbitrators } from './features/ShowArbitrators';
import IPFS from './features/IPFS';
// import { EncryptFile } from './features/EncryptFile'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <CreateContract />
          <StartArbitration />
          <ShowArbitrators />
          <IPFS />
        </Provider>
      </div>
    );
  }
}

export default App;
