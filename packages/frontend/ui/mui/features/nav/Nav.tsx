import Button from '@mui/material/Button';
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../auth/authSlice";

export const Nav = () => {
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const authState = useAppSelector(selectAuth);

    return <Fragment>
        {authState.isAuthenticated && location.pathname !== '/dashboard' && <Button data-testid="dashboard-link" color="inherit" onClick={() => history.push('/dashboard')}>{t('dashboard')}</Button>}
        {location.pathname !== '/' && <Button data-testid="home-link" color="inherit" onClick={() => history.push('/')}>{t('home')}</Button>}
    </Fragment>
}