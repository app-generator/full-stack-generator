import { Card, Col, Progress, Row, Table } from "antd";
import { Data } from "generated-api";
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
        { dataIndex: 'id', title: t('data.id') },
        { dataIndex: 'name', title: t('data.name'), sorter: (a: Data, b: Data) => (a.name || '').localeCompare(b.name || ''), },
        {
            dataIndex: 'value', title: t('data.value'),
            sorter: (a: Data, b: Data) => (a.value || 0) - (b.value || 0),
        },
        {
            dataIndex: 'timestamp',
            title: t('data.timestamp'),
            sorter: (a: Data, b: Data) => moment(a.timestamp).diff(moment(b.timestamp))
        }
    ];


    const tooltipFormatter = (value: any, name: string, props: any) => [value, t(`data.${name}`)];
    const timeSeriesLabelTooltipFormatter = (label: string) => moment.unix(Number(label) / 1000).format('LLL');


    return <><Row>
        <Col span={24}>
            <Card data-testid="table-card" title={t('dashboard.table')} style={{margin:10}}>
                <Table dataSource={dashboardState.table.data} columns={columns} />
            </Card>
        </Col>
    </Row>
        <Row>
            <Col data-testid="bar-chart-card" span={8}>
                <Card title={t('dashboard.barChart')} style={{margin:10}}>
                    {dashboardState.barChart.loading ? (<Progress type="circle" />) : (
                        <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                            <BarChart data={dashboardState.barChart.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={tooltipFormatter} />
                                <Bar dataKey="value" fill={theme.palette.secondary.main} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </Card>
            </Col>
            <Col span={8}>
                <Card data-testid="time-series-card" title={t('dashboard.timeSeries')} style={{margin:10}}>
                    {dashboardState.timeSeries.loading ? (<Progress type="circle" />) : (
                        <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                            <LineChart data={dashboardState.timeSeries.data.map(d => ({ ...d, timestamp: d.timestamp?.getTime() })).sort((d1, d2) => (d1?.timestamp || 0) - (d2?.timestamp || 0))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={(unixTime) => moment.unix(unixTime / 1000).format('LL')} domain={['auto', 'auto']} />
                                <YAxis dataKey="value" type="number" />
                                <Tooltip formatter={tooltipFormatter} labelFormatter={timeSeriesLabelTooltipFormatter} />
                                <Line type="monotone" dataKey="value" stroke={theme.palette.secondary.main} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </Card>
            </Col>
            <Col span={8}>
                <Card data-testid="pie-chart-card" title={t('dashboard.pieChart')} style={{margin:10}}>
                    {dashboardState.pieChart.loading ? (<Progress type="circle" />) : (
                        <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                            <PieChart>
                                <Tooltip />
                                <Pie data={dashboardState.pieChart.data} paddingAngle={5} dataKey="value" nameKey="name" fill={theme.palette.secondary.main} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </Card>
            </Col>
        </Row>
    </>
}