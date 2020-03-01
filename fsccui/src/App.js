import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout';
import Register from './containers/Register';
import Completed from './components/Completed';

class App extends Component {
  //
  render() {
    //
    let routes = (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/completed" component={Completed} />
          <Redirect to="/register" />
        </Switch>
    );

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default withRouter((App));
