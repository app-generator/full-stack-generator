import { ChakraProvider, Flex } from "@chakra-ui/react";
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
import { theme } from "./theme";

export default function App() {

  const authState = useAppSelector(selectAuth);

  return (
    <ChakraProvider theme={theme}>
      <Flex grow={1} direction="column">
        <Flex as="nav" bg="brand.100" padding={2} direction="row" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <img src={logo} alt="AppSeed" style={{ maxWidth: 200 }} />
            <Nav />
          </Flex>
          <Flex>
            <AuthBox />
          </Flex>
        </Flex>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <GuardedRoute path="/dashboard" predicate={() => authState.isAuthenticated}>
            <Dashboard />
          </GuardedRoute>
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </Flex>
    </ChakraProvider>
  );
}
