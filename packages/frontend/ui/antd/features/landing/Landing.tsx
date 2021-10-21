import { Card, Col, Layout, Progress, Row, Typography } from 'antd';
import moment from "moment";
import { CSSProperties, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadFrontPageArticles, selectLandingPage } from "./landingPageSlice";

const { Header } = Layout;
const { Title, Paragraph} = Typography;

const jumbotronStyle: CSSProperties = {
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
}

const articleSectionStyle: CSSProperties = {
    padding: 10
}

const articleStyle: CSSProperties = {
    height: 350,
    margin: 5,
    overflow: 'auto'
}

export const Landing = () => {

    const { t } = useTranslation();
    const articleState = useAppSelector(selectLandingPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFrontPageArticles());
    }, [dispatch]);

    return <Typography>
        <Layout>
            <Header style={jumbotronStyle}>
                <Title data-testid="landing-title" style={{color:'white'}}>
                    {t('jumbotron.title')}
                </Title>
                <Title data-testid="landing-subtitle" level={2} style={{color:'white'}}>
                    {t('jumbotron.subtitle')}
                </Title>
            </Header>
            {articleState.loading && <Progress type="circle" />}
            <Row style={articleSectionStyle} data-testid="landing-articles">
                {
                    articleState.articles.map(article => (
                        <Col span={6} key={article.id}>
                            <Card style={articleStyle} title={article.title} extra={moment(article.publishDate).format('L')}>
                                <Paragraph>
                                    {article.text}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Layout>
    </Typography>
}