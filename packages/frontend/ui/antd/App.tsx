import { Col, Header, Layout, Row } from 'antd';
import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { AuthBox, Callback } from "./features/auth/Auth";
import { selectAuth } from "./features/auth/authSlice";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Landing } from "./features/landing/Landing";
import { Nav } from "./features/nav/Nav";
import GuardedRoute from "./GuardedRoute";
import logo from "./logo.png";

export default function App() {

  const authState = useAppSelector(selectAuth);

  return (
      <Layout>
      <Header data-testid="mainMenu">
        <Row>
          <Col span={8} data-testid="leftToolbar">
            <img data-testid="logo" src={logo} alt="AppSeed" style={{ maxWidth: 200 }} />
            <Nav />
          </Col>
          <Col span={8} offset={8}>
            <AuthBox />
          </Col>
        </Row>
      </Header>
      <Content data-testid="mainContent" style={{ marginTop: -10 }}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <GuardedRoute path="/dashboard" predicate={() => authState.isAuthenticated}>
            <Dashboard />
          </GuardedRoute>
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </Paper>
    </Content>
  );
}
