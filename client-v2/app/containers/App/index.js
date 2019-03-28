/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import saga from './saga';
import RoutesPublic from '../../layouts/Public';
import RoutesAdmin from '../../layouts/Admin';
import RoutesUser from '../../layouts/User';

import GlobalStyle from '../../global-styles';
import AdminRoute from '../../components/Routes/AdminRoute';
import UserRoute from '../../components/Routes/UserRoute';

const App = () => (
  <>
    <Switch>
      <UserRoute path="/user" component={RoutesUser} />
      <AdminRoute path="/admin" component={RoutesAdmin} />
      <Route path="/" component={RoutesPublic} />
    </Switch>
    <GlobalStyle />
  </>
);

const withSaga = injectSaga({ key: 'global', saga });

export default compose(withSaga)(App);
