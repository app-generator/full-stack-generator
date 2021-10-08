import * as api from "generated-api";
import { store } from "../../app/store";
import { loadFrontPageArticles } from "./landingPageSlice";

test('should call api to load articles', async () => {
    const returnData: api.Article[] = [
        { id: '1', title:'lorem 1', publishDate: new Date('2020-10-01T10:00:00Z'), text: 'lorem ipsum dolor' },
        { id: '2', title:'lorem 2', publishDate: new Date('2020-11-01T11:00:00Z'), text: 'lorem ipsum dolor sit amet' }
    ];
    jest.spyOn(api.ArticleApi.prototype, "getArticles").mockResolvedValue(returnData);

    await store.dispatch(loadFrontPageArticles());
    expect(store.getState().landingPage.articles).toEqual(returnData);
})