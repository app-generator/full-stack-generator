import moment from "moment";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadFrontPageArticles, selectLandingPage } from "./landingPageSlice";

export const Landing = () => {

    const { t } = useTranslation();
    const articleState = useAppSelector(selectLandingPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFrontPageArticles());
    }, [dispatch]);

    return <Container fluid>
        <Row className="bg-primary mb-5">
            <h1 data-testid="landing-title" className="text-center text-light" style={{ marginTop: 150, marginBottom: 100 }}>
                {t('jumbotron.title')}
            </h1>
            <h2 data-testid="landing-subtitle" className="text-center text-light" style={{ marginBottom: 100 }}>
                {t('jumbotron.subtitle')}
            </h2>
        </Row>
        {articleState.loading && <ProgressBar />}
        <Row data-testid="landing-articles">
            {
                articleState.articles.map(article => (
                    <Col xs={4} key={article.id}>
                        <Card className="p-3 mb-3">
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Subtitle>{moment(article.publishDate).format('L')}</Card.Subtitle>
                            <Card.Text>
                                {article.text}
                            </Card.Text>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    </Container>
}