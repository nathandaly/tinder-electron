/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import BatchPage from './containers/BatchPage';
import Authentication from './containers/Authentication';

export default () => (
  <App>
    <Switch>
      <Route path="/batch" component={BatchPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={Authentication} />
    </Switch>
  </App>
);
