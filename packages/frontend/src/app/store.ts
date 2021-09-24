import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import landingPageReducer from "../features/landing/landingPageSlice";
import userListReducer from "../features/user-list/userListSlice";

export const store = configureStore({
  reducer: {
    userList: userListReducer,
    auth: authReducer,
    landingPage: landingPageReducer,
    dashboard: dashboardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
