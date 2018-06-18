/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import BatchPage from './containers/BatchPage';

export default () => (
  <App>
    <Switch>
      <Route path="/batch" component={BatchPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
