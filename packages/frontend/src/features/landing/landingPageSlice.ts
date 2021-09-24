import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Article,
  ArticleApi, Configuration
} from "generated-api";
import { RootState } from "../../app/store";

export interface LandingPageState {
  articles: Article[];
  loading: boolean;
}

const initialState: LandingPageState = {
  articles: [],
  loading: false,
};

const api = () =>
  new ArticleApi(
    new Configuration({
      basePath: process.env.REACT_APP_API_URL || window.location.origin,
    })
  );

export const loadFrontPageArticles = createAsyncThunk(
  "landing-page/loadArticles",
  async () => {
    return api().getArticles({category:'FRONT_PAGE'});
  }
);

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loadFrontPageArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFrontPageArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      });
  },
});

export const selectLandingPage = (state: RootState) => state.landingPage;

export default landingPageSlice.reducer;
