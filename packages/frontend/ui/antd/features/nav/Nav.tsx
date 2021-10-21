import { Button } from 'antd';
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../auth/authSlice";

export const Nav = () => {
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const authState = useAppSelector(selectAuth);

    return <>
        {authState.isAuthenticated && location.pathname !== '/dashboard' && <Button data-testid="dashboard-link" onClick={() => history.push('/dashboard')}>{t('dashboard')}</Button>}
        {location.pathname !== '/' && <Button data-testid="home-link" onClick={() => history.push('/')}>{t('home')}</Button>}
    </>
}