import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { CSSProperties, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme";
import { loadBarChartData, loadPieChartData, loadTableData, loadTimeSeriesData, selectDashboard } from "./dashboardSlice";

const dashboardStyle: CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
}

const tableStyle: CSSProperties = {
    margin: '5rem',
    width: 'calc(100% - 10rem)'
}

const chartStyle: CSSProperties = {
    width: 600,
    height: 600,
    margin: 10
}

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

    return <Paper style={dashboardStyle}>
        <Card style={tableStyle}>
            <CardHeader title={t('dashboard.table')} />
        </Card>
        <Card style={chartStyle}>
            <CardHeader title={t('dashboard.barChart')} />
            <CardContent>
                {dashboardState.barChart.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <BarChart data={dashboardState.barChart.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill={theme.palette.secondary.main} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
        <Card style={chartStyle}>
            <CardHeader title={t('dashboard.timeSeries')} />
            <CardContent>
                {dashboardState.timeSeries.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <LineChart data={dashboardState.timeSeries.data.map(d => ({ ...d, timestamp: d.timestamp?.getTime() })).sort((d1,d2)=>(d1?.timestamp||0)-(d2?.timestamp||0))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={(unixTime) => moment(unixTime).format('MMM d HH:mm')} domain = {['auto', 'auto']}/>
                            <YAxis dataKey="value" type="number"/>
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke={theme.palette.secondary.main} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
        <Card style={chartStyle}>
            <CardHeader title={t('dashboard.pieChart')} />
            <CardContent style={{ width: '100%', height: '100%' }}>
                {dashboardState.pieChart.loading ? (<CircularProgress />) : (
                    <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                        <PieChart>
                            <Tooltip />
                            <Pie data={dashboardState.pieChart.data} paddingAngle={5} dataKey="value" nameKey="name" fill={theme.palette.secondary.main} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    </Paper>
}