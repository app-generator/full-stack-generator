// https://dev.to/kdhttps/appauth-js-integration-in-react-1m3e

import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleCallback, login, logout } from "./authService";
import { checkAuth, selectAuth } from "./authSlice";

export const Callback = (props: any) => {
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      handleCallback(
        () => dispatch(checkAuth()),
        error => console.log(error)
      );
    },
    [props, dispatch]
  );

  return (<div></div>)
};

export const AuthBox = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(checkAuth());
    },
    [dispatch]
  );

  return authState.isAuthenticated ? (
    <Button color="inherit" onClick={() => { logout(); dispatch(checkAuth()); history.push('/'); }}>
      {t("Logout")}
    </Button>
  ) : (
    <Button color="inherit" onClick={() => login()}>
      {t("Login")}
    </Button>
  );
}