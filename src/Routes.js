import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from './utils/isAuthenticated';
import Home from './views/Home';
import Login from './views/Login';
import Profile from './views/Profile';
import AddZone from './views/AddZone';
import SignupComponet from './components/user/signup';

function Logout(){
	localStorage.removeItem('mapToken')
	return <Redirect to="/login" />
}

const SecureLogout = isAuthenticated(Logout);

function Routes() {
  return (
   <>
		<Route exact path="/" component={ (props) => <Home {...props} />} />
    <Route exact path="/login" component={Login} />
		<Route exact path="/logout" component={SecureLogout} />
    <Route exact path="/me" component={Profile} />
    <Route exact path="/zone/new" component={AddZone} />

    <Route exact path="/signup" component={SignupComponet} />
   </>
  );
}

export default Routes;