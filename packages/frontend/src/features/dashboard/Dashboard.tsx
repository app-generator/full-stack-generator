import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme";
import { loadBarChartData, loadPieChartData, loadTableData, loadTimeSeriesData, selectDashboard } from "./dashboardSlice";
import { localizeDataGrid } from "./DataGridLocalization";


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

    const columns: GridColDef[] = [
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
    const timeSeriesLabelTooltipFormatter = (label: string) => moment.unix(Number(label)/1000).format('LLL');


    return <Grid container spacing={5}>
        <Grid item xs={12}>
            <Card data-testid="table-card">
                <CardHeader title={t('dashboard.table')} />
                <CardContent style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={dashboardState.table.data} columns={columns} rowsPerPageOptions={[5,10]} pageSize={5} localeText={localizeDataGrid(t)} />
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card data-testid="bar-chart-card">
                <CardHeader title={t('dashboard.barChart')} />
                <CardContent>
                    {dashboardState.barChart.loading ? (<CircularProgress />) : (
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
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card data-testid="time-series-card">
                <CardHeader title={t('dashboard.timeSeries')} />
                <CardContent>
                    {dashboardState.timeSeries.loading ? (<CircularProgress />) : (
                        <ResponsiveContainer width="80%" height="80%" minWidth={500} minHeight={500}>
                            <LineChart data={dashboardState.timeSeries.data.map(d => ({ ...d, timestamp: d.timestamp?.getTime() })).sort((d1, d2) => (d1?.timestamp || 0) - (d2?.timestamp || 0))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={(unixTime) => moment.unix(unixTime/1000).format('LL')} domain={['auto', 'auto']} />
                                <YAxis dataKey="value" type="number" />
                                <Tooltip formatter={tooltipFormatter} labelFormatter={timeSeriesLabelTooltipFormatter} />
                                <Line type="monotone" dataKey="value" stroke={theme.palette.secondary.main} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card data-testid="pie-chart-card">
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
        </Grid>
    </Grid>
}