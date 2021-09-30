import moment from "moment";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
        { field: 'id', headerName: t('data.id'), flex: 1 },
        { field: 'name', headerName: t('data.name'), flex: 5 },
        {
            field: 'value', headerName: t('data.value'), type: 'number',
            flex: 2,
        },
        {
            field: 'timestamp',
            headerName: t('data.timestamp'),
            flex: 3,
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

    return <Container fluid>
        <Row>
            <Col xs={12}>
                <Card className="p-3 mb-5">
                    <Card.Title>{t('dashboard.table')}</Card.Title>
                    <Card.Body>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {columns.map(c => <th key={`${c.field}-header`}>{c.headerName}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardState.table.data.map(r =>
                                (<tr key={r.id}>
                                    {columns.map(c =>
                                        (<td key={`${c.field}-${r.id}`}>{renderField(c, r)}</td>)
                                    )}
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="p-3">
                    <Card.Title>{t('dashboard.barChart')}</Card.Title>
                    <Card.Body>
                        {dashboardState.barChart.loading ? (<Spinner animation="border" />) : (
                            <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                                <BarChart data={dashboardState.barChart.data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={tooltipFormatter} />
                                    <Bar dataKey="value"  />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="p-3">
                    <Card.Title>{t('dashboard.timeSeries')}</Card.Title>
                    <Card.Body>
                        {dashboardState.timeSeries.loading ? (<Spinner animation="border" />) : (
                            <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                                <LineChart data={dashboardState.timeSeries.data.map(d => ({ ...d, timestamp: d.timestamp?.getTime() })).sort((d1, d2) => (d1?.timestamp || 0) - (d2?.timestamp || 0))}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={(unixTime) => moment.unix(unixTime / 1000).format('LL')} domain={['auto', 'auto']} />
                                    <YAxis dataKey="value" type="number" />
                                    <Tooltip formatter={tooltipFormatter} labelFormatter={timeSeriesLabelTooltipFormatter} />
                                    <Line type="monotone" dataKey="value" />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={4}>
                <Card className="p-3">
                    <Card.Title>{t('dashboard.pieChart')} </Card.Title>
                    <Card.Body style={{ width: '100%', height: '100%' }}>
                        {dashboardState.pieChart.loading ? (<Spinner animation="border" />) : (
                            <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                                <PieChart>
                                    <Tooltip />
                                    <Pie data={dashboardState.pieChart.data} paddingAngle={5} dataKey="value" nameKey="name"  />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}