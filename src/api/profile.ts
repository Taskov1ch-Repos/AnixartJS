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
    IVoteRelease
} from "../types";

/**
 * Класс профиля
 * 
 * TODO: changeAvatar
 */
export class Profile {
    public constructor(private readonly client: Anixart) { }

    public async info(id: number, options?: IBaseApiParams): Promise<IProfileResponse> {
        return this.client.call<IProfileResponse>({ path: `/profile/${id}`, ...options });
    }

    public async getBookmarks(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return this.client.call<IPageableResponse<IRelease>>({ path: `/profile/list/all/${data.id ? `${data.id}/` : ""}${data.type}/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    public async addBookmark(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<IResponse>({ path: `/profile/list/add/${type}/${id}`, ...options });
    }

    public async removeBookmark(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return this.client.call<IResponse>({ path: `/profile/list/delete/${type}/${id}`, ...options });
    }

    public async search(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfile>> {
        return this.client.call<IPageableResponse<IProfile>>({ path: `/search/profiles/${data.page}`, json: { query: data.query, page: data.page }, ...options });
    }

    public async getFriends(data: IFriendsRequest, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<IPageableResponse<IProfileShort>>({ path: `/profile/friend/all/${data.id}/${data.page}`, ...options });
    }

    public async getFriendRecomendation(options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<IPageableResponse<IProfileShort>>({ path: `/profile/friend/recomendations`, ...options });
    }

    public async getFriendRequests(type: "in" | "out", count: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<IPageableResponse<IProfileShort>>({ path: `/profile/friend/requests/${type}/last`, queryParams: { count }, ...options });
    }

    public async sendFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse> {
        return await this.client.call<IFriendRequestResponse>({ path: `/profile/friend/request/send/${id}`, ...options });
    }

    public async removeFriendRequest(id: number, options?: IBaseApiParams): Promise<IFriendRequestResponse> {
        return await this.client.call<IFriendRequestResponse>({ path: `/profile/friend/request/remove/${id}`, ...options });
    }

    public async hideFriendRequest(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/profile/friend/request/hide/${id}`, ...options });
    }

    public async getAchivement(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/achivement/get/${id}`, ...options });
    }

    public async getFavorites(data: IBookmarkRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/favorite/all/${data.page}`, queryParams: { sort: data.sort, filter: data.filter, filter_announce: data.filter_announce }, ...options });
    }

    public async getSubsciptions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<IPageableResponse<any>>({ path: `/channel/subscription/all/${page}`, ...options });
    }

    public async getSubscriptionCount(options?: IBaseApiParams): Promise<ISubsciptionCountResponse> {
        return await this.client.call<ISubsciptionCountResponse>({ path: `/channel/subscription/count`, ...options });
    }

    public async getVotesReleases(id: number, page: number, sort: number = 1, options?: IBaseApiParams): Promise<IPageableResponse<IVoteRelease>> {
        return await this.client.call<IPageableResponse<IVoteRelease>>({ path: `/profile/vote/release/voted/${id}/${page}`, queryParams: {sort}, ...options})
    }
}