import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ERC_20 from './components/ERC_20';
import ERC_721 from './components/ERC_721';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={ERC_20} />
            <Route path='/ERC_721' component={ERC_721} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
