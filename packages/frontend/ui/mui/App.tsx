import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { CSSProperties } from "react";
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

const appBarStyle: CSSProperties = {
  display: "inline-flex",
  flexDirection: 'row',
  justifyContent: "space-between"
}

export default function App() {

  const authState = useAppSelector(selectAuth);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ flexGrow: 1 }}>
        <AppBar data-testid="mainMenu" position="static" style={appBarStyle}>
          <Toolbar data-testid="leftToolbar">
            <img data-testid="logo" src={logo} alt="AppSeed" style={{ maxWidth: 200 }} />
            <Nav />
          </Toolbar>
          <Toolbar>
            <AuthBox/>
          </Toolbar>
        </AppBar>
        <Paper data-testid="mainContent" style={{ marginTop: -10 }}>
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
      </div>
    </ThemeProvider>
  );
}
