import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import { Route, Switch } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { AuthBox, Callback } from "./features/auth/Auth";
import { selectAuth } from "./features/auth/authSlice";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Landing } from "./features/landing/Landing";
import { Nav } from "./features/nav/Nav";
import GuardedRoute from "./GuardedRoute";
import logo from "./logo.png";
import './theme.scss';

export default function App() {

  const authState = useAppSelector(selectAuth);

  return (
    <Container fluid>
      <Navbar className="justify-content-between">
          <Navbar >
            <Navbar.Brand>
              <img src={logo} alt="AppSeed" style={{ maxWidth: 200 }} />
            </Navbar.Brand>
            <Nav />
          </Navbar>
          <Navbar >
            <AuthBox />
          </Navbar>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <GuardedRoute path="/dashboard" predicate={() => authState.isAuthenticated}>
          <Dashboard />
        </GuardedRoute>
        <Route exact path="/callback" component={Callback} />
      </Switch>
    </Container>
  );
}
