import 'antd/dist/antd.css';

import React, { Component } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';

/* Routes */
import './App.scss';
import MenuNetflux from './Views/MenuNetflux';
import Categorie from './Views/ContainNetflux/Categorie';
import Home from './Views/ContainNetflux/Home';


class App extends Component {
  render() {
    return (
      <Layout className="layout" >
        <Router>
          <div>
            <MenuNetflux />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/categorie/:type" component={Categorie} />
            </Switch>
          </div>
        </Router>
      </Layout>
    );
  }
}

export default hot(module)(App);
