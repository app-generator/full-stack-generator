import {
    Box,
    CircularProgress, Flex, Heading, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme";
import { loadBarChartData, loadPieChartData, loadTableData, loadTimeSeriesData, selectDashboard } from "./dashboardSlice";


export const Dashboard = () => {

    const { t } = useTranslation();
    const dashboardState = useAppSelector(selectDashboard);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadBarChartData());
        dispatch(loadPieChartData());
        dispatch(loadTimeSeriesData());
        dispatch(loadTableData());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: t('data.id'), flex: 0.1 },
        { field: 'name', headerName: t('data.name'), flex: 0.5 },
        {
            field: 'value', headerName: t('data.value'), type: 'number',
            flex: 0.2,
        },
        {
            field: 'timestamp',
            headerName: t('data.timestamp'),
            flex: 0.3,
            type: 'date'
        }
    ];


    const tooltipFormatter = (value: any, name: string, props: any) => [value, t(`data.${name}`)];
    const timeSeriesLabelTooltipFormatter = (label: string) => moment.unix(Number(label) / 1000).format('LLL');

    const renderField = (colDef: { field: string, type?: string }, row: any) => {
        switch (colDef.type) {
            case 'date':
                return moment(row[colDef.field]).format('LLL');
            default:
                return row[colDef.field];
        }
    }


    return <Flex direction="column" padding={5}>
        <Box marginBottom={10}>
            <Heading as="h3">{t('dashboard.table')}</Heading>
            {dashboardState.barChart.loading ? (<CircularProgress />) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            {columns.map(c => <Th>{c.headerName}</Th>)}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dashboardState.table.data.map(r =>
                        (<Tr>
                            {columns.map(c =>
                                (<Td>{renderField(c, r)}</Td>)
                            )}
                        </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
        <SimpleGrid minChildWidth={600}>
            <Box>
                <Heading as="h3">{t('dashboard.barChart')}</Heading>
                {dashboardState.barChart.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <BarChart data={dashboardState.barChart.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={tooltipFormatter} />
                            <Bar dataKey="value" fill={theme.colors.brand[900]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>
            <Box>
                <Heading as="h3">{t('dashboard.timeSeries')}</Heading>
                {dashboardState.timeSeries.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <LineChart data={dashboardState.timeSeries.data.map(d => ({ ...d, timestamp: d.timestamp?.getTime() })).sort((d1, d2) => (d1?.timestamp || 0) - (d2?.timestamp || 0))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={(unixTime) => moment.unix(unixTime / 1000).format('LL')} domain={['auto', 'auto']} />
                            <YAxis dataKey="value" type="number" />
                            <Tooltip formatter={tooltipFormatter} labelFormatter={timeSeriesLabelTooltipFormatter} />
                            <Line type="monotone" dataKey="value" stroke={theme.colors.brand[900]} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Box>
            <Box>
                <Heading>{t('dashboard.pieChart')}</Heading>
                {dashboardState.pieChart.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <PieChart>
                            <Tooltip />
                            <Pie data={dashboardState.pieChart.data} paddingAngle={5} dataKey="value" nameKey="name" fill={theme.colors.brand[900]} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </SimpleGrid>
    </Flex>
}