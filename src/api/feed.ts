import { Anixart } from "../client";
import {
    IPageableResponse,
    IBaseApiParams,
    IArticle
} from "../types";

export class Feed {
    public constructor(private readonly client: Anixart) { }

    public async news(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<IPageableResponse<IArticle>>({ path: `/feed/news/all/${page}`, ...options });
    }

    public async my(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<IPageableResponse<IArticle>>({ path: `/feed/my/all/${page}`, ...options });
    }

    public async latest(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IArticle>> {
        return await this.client.call<IPageableResponse<IArticle>>({ path: `/article/latest/all/${page}`, method: "POST", ...options });
    }
}