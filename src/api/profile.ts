import { Anixart } from "../client";
import {
    IProfileResponse,
    IBookmarkRequest,
    IFriendsRequest,
    IProfileShort,
    IFriendRequestResponse,
    IBaseApiParams,
    IBaseSearchRequest,
    IPageableResponse,
    IRelease,
    IProfile,
    IResponse,
    ISubsciptionCountResponse,
    IVoteRelease,
    DefaultResult,
    SendFriendRequestResult,
    RemoveFriendRequestResult,
    AchivementResult
} from "../types";

/**
 * Класс профиля
 * 
 * TODO: changeAvatar
 */
export class Profile {
    public constructor(private readonly client: Anixart) { }

    public async info(id: number, options?: IBaseApiParams): Promise<IProfileResponse> {
        return this.client.call<DefaultResult, IProfileResponse>({ path: `/profile/${id}`, ...options });
    }

    public async getBookmarks(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/profile/list/all/${data.id ? `${data.id}/` : ""}${data.type}/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    // Там вообще просто пустой класс ответа в приложении, так что будет просто дефолтные ответы
    public async addBookmark(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<DefaultResult, IResponse>({ path: `/profile/list/add/${type}/${id}`, ...options });
    }

    // Там вообще просто пустой класс ответа в приложении, так что будет просто дефолтные ответы
    public async removeBookmark(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<DefaultResult, IResponse>({ path: `/profile/list/delete/${type}/${id}`, ...options });
    }

    public async search(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return this.client.call<DefaultResult, IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, page: data.page }, ...options });
    }

    public async getFriends(data: IFriendsRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/all/${data.id}/${data.page}`, ...options });
    }

    public async getFriendRecomendation(options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/recomendations`, ...options });
    }

    public async getFriendRequests(type: "in" | "out", count: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<DefaultResult, IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/last`, queryParams: { count }, ...options });
    }

    public async sendFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse> {
        return await this.client.call<DefaultResult, IFriendRequestResponse>({ path: `/profile/friend/request/send/${id}`, ...options });
    }

    public async removeFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse<RemoveFriendRequestResult>> {
        return await this.client.call<DefaultResult, IFriendRequestResponse<RemoveFriendRequestResult>>({ path: `/profile/friend/request/remove/${id}`, ...options });
    }

    public async hideFriendRequest(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<DefaultResult, IResponse>({ path: `/profile/friend/request/hide/${id}`, ...options });
    }

    public async getAchivement(id: number, options?: IBaseApiParams): Promise<IResponse<AchivementResult>> {
        return await this.client.call<AchivementResult, IResponse<AchivementResult>>({ path: `/achivement/get/${id}`, ...options });
    }

    public async getFavorites(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IRelease>>({ path: `/favorite/all/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    public async getSubsciptions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<DefaultResult, IPageableResponse<any>>({ path: `/channel/subscription/all/${page}`, ...options });
    }

    public async getSubscriptionCount(options?: IBaseApiParams): Promise<ISubsciptionCountResponse> {
        return await this.client.call<DefaultResult, ISubsciptionCountResponse>({ path: `/channel/subscription/count`, ...options });
    }

    public async getVotesReleases(id: number, page: number, sort: number = 1, options?: IBaseApiParams): Promise<IPageableResponse<IVoteRelease>> {
        return await this.client.call<DefaultResult, IPageableResponse<IVoteRelease>>({ path: `/profile/vote/release/voted/${id}/${page}`, queryParams: {sort}, ...options})
    }
}