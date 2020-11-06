import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/home';
import CompanyRepos from '../pages/companyRepos';

export default () => (
  <BrowserRouter>
    <div className="container h-100 pb-4 pt-4">
      <Switch>
        <Route path="/companyRepos/:id" component={CompanyRepos} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  </BrowserRouter>
);
