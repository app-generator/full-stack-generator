import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { CSSProperties, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme";
import { loadFrontPageArticles, selectLandingPage } from "./landingPageSlice";


const jumbotronStyle: CSSProperties = {
    height: 600,
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
}

const jumbotronTextStyle: CSSProperties = {
    color: theme.palette.getContrastText(theme.palette.secondary.main)
}

const articleSectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
}

const articleStyle: CSSProperties = {
    width: 400,
    margin: 10
}

export const Landing = () => {

    const { t } = useTranslation();
    const articleState = useAppSelector(selectLandingPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFrontPageArticles());
    }, [dispatch]);

    return <Paper style={{ flexGrow: 1 }}>
        <Paper style={jumbotronStyle}>
            <Typography variant="h1" component="h1" style={jumbotronTextStyle}>
                {t('jumbotron.title')}
            </Typography>
            <Typography variant="h2" component="h2" style={jumbotronTextStyle}>
                {t('jumbotron.subtitle')}
            </Typography>
        </Paper>
        {articleState.loading && <LinearProgress />}
        <Paper style={articleSectionStyle}>
            {
                articleState.articles.map(article => (
                    <Card style={articleStyle} key={article.id}>
                        <CardHeader title={article.title} subheader={moment(article.publishDate).format('L')} />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {article.text}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </Paper>
    </Paper>
}