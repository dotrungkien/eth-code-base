import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import getWeb3 from '@dotrungkien/get-web3';

import Erc20 from './components/Erc20_UI/Erc20';
import Erc721 from './components/Erc721_UI/Erc721';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null
    };
  }

  async componentDidMount() {
    this.setState({ web3: await getWeb3() });
  }
  render() {
    if (this.state.web3) {
      return (
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={() => <Erc20 web3={this.state.web3} />} />
              <Route path='/ERC_721' component={() => <Erc721 web3={this.state.web3} />} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      return <div>waiting ...</div>;
    }
  }
}

export default App;
