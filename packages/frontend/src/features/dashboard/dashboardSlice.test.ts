import { AsyncThunk } from "@reduxjs/toolkit";
import * as api from "generated-api";
import { store } from "../../app/store";
import { authHeaderMiddleware } from "../auth/authService";
import { DashboardState, loadBarChartData, loadPieChartData, loadTableData, loadTimeSeriesData } from "./dashboardSlice";

type TestData = { type: api.DataTypeEnum, dispatch: AsyncThunk<api.Data[], void, {}>, stateSelect: (state: DashboardState) => api.Data[] }

const testData: TestData[] = [
    {
        type: api.DataTypeEnum.BarChart,
        dispatch: loadBarChartData,
        stateSelect: (state: DashboardState) => state.barChart.data
    },
    {
        type: api.DataTypeEnum.PieChart,
        dispatch: loadPieChartData,
        stateSelect: (state: DashboardState) => state.pieChart.data
    },
    {
        type: api.DataTypeEnum.Table,
        dispatch: loadTableData,
        stateSelect: (state: DashboardState) => state.table.data
    },
    {
        type: api.DataTypeEnum.TimeSeries,
        dispatch: loadTimeSeriesData,
        stateSelect: (state: DashboardState) => state.timeSeries.data
    },
]

test.each(testData)('should call api to load data', async (testCase: TestData) => {
    const returnData: api.Data[] = [
        { id: '1', name: 'test1', value: 1, type: testCase.type },
        { id: '2', name: 'test2', value: 2, type: testCase.type }
    ];
    const middlewareSpy = jest.spyOn(api.DataApi.prototype, "withPreMiddleware").mockReturnValue(new api.DataApi());
    jest.spyOn(api.DataApi.prototype, "getData").mockResolvedValue(returnData);

    await store.dispatch(testCase.dispatch());
    expect(middlewareSpy).toHaveBeenCalledWith(authHeaderMiddleware);
    expect(testCase.stateSelect(store.getState().dashboard)).toEqual(returnData);
})