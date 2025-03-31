import { Anixart } from "../client";
import {
    IPageableResponse,
    INotificationCountResponse,
    IFriendNotification,
    IRelatedReleaseNotification,
    IResponse,
    IBaseApiParams
} from "../types";

export class Notification {
    public constructor(private readonly client: Anixart) { }

    public async countNotifications(options?: IBaseApiParams): Promise<INotificationCountResponse> {
        return await this.client.call<INotificationCountResponse>({ path: `/notification/count`, ...options });
    }

    public async getNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IFriendNotification | IRelatedReleaseNotification>> {
        return await this.client.call<IPageableResponse<IFriendNotification | IRelatedReleaseNotification>>({ path: `/notification/all/${page}`, ...options });
    }

    public async getFriendsNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IFriendNotification>> {
        return await this.client.call<IPageableResponse<IFriendNotification>>({ path: `/notification/friends/${page}`, ...options });
    }

    public async getRelatedReleaseNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelatedReleaseNotification>> {
        return await this.client.call<IPageableResponse<IRelatedReleaseNotification>>({ path: `/notification/related/release/${page}`, ...options });
    }

    public async getEpisodeNotificaions(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<IPageableResponse<any>>({ path: `/notification/episodes/${page}`, ...options });
    }

    public async getReleaseCommentNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<IPageableResponse<any>>({ path: `/notification/releaseComments/${page}`, ...options });
    }

    public async getCollectionCommentNotifications(page: number, options?: IBaseApiParams): Promise<IPageableResponse<any>> {
        return await this.client.call<IPageableResponse<any>>({ path: `/notification/collectionComments/${page}`, ...options });
    }

    public async removeNotifications(options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/notification/remove/all`, ...options });
    }
}