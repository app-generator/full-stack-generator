import { Box, Flex, Heading, Progress, SimpleGrid, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect } from "react";
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

    return <Flex direction="column">
        <Flex direction="column" bg="brand.900" alignItems="center">
            <Heading as="h1" size="4xl" color="brand.100" marginTop={60}>
                {t('jumbotron.title')}
            </Heading>
            <Heading as="h2" size="2xl" color="brand.100" marginTop={20} marginBottom={20}>
                {t('jumbotron.subtitle')}
            </Heading>
        </Flex>
        {articleState.loading && <Progress />}
        <SimpleGrid spacing={5} padding={5} minChildWidth={400}>
            {
                articleState.articles.map(article => (
                    <Box key={article.id} borderWidth="1px" borderRadius="lg" padding={3}>
                        <Heading as="h3" size="md" marginBottom={5}>
                            {article.title}
                        </Heading>
                        <Text as="h4" size="md">
                            {moment(article.publishDate).format('L')}
                        </Text>
                        <Text as="p">
                            {article.text}
                        </Text>
                    </Box>
                ))
            }
        </SimpleGrid>
    </Flex>
}