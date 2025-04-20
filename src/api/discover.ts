import { Anixart } from "../client";
import {
    IPageableResponse,
    IBaseApiParams,
    IRelease,
    ICommentRelease,
    IInterestingRelease
} from "../types";


export class Discover {
    public constructor(private readonly client: Anixart) { }

    public async getWatching(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/discover/watching/${page}`, ...options });
    }

    public async getComments(options?: IBaseApiParams): Promise<IPageableResponse<ICommentRelease>> {
        return await this.client.call<IPageableResponse<ICommentRelease>>({ path: `/discover/comments`, ...options });
    }

    public async getDiscussing(options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/discover/discussing`, ...options });
    }

    public async getRecommendations(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/discover/recommendations/${page}`, queryParams: { previous_page: page > 0 ? -1 : page - 1 }, ...options });
    }

    public async getInteresting(options?: IBaseApiParams): Promise<IPageableResponse<IInterestingRelease>> {
        return await this.client.call<IPageableResponse<IInterestingRelease>>({ path: `/discover/interesting`, ...options });
    }
}