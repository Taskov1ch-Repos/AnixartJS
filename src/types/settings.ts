import { IBadge, IProfile } from "./profile";
import { IPageableResponse, IResponse } from "./response";


export interface IProfileSettingsResponse extends IResponse {
    avatar: string,
    status: string,
    vkPage: string,
    tgPage: string,
    is_private: boolean,
    isPrivate: boolean,
    privacy_stats: number,
    privacy_counts: number,
    privacy_social: number,
    privacy_friend_requests: number,
    is_vk_bound: boolean,
    isVkBound: boolean,
    is_goolge_bound: boolean,
    isGoogleBound: boolean,
    is_login_changed: boolean,
    isLoginChanged: boolean,
    is_change_login_banned: boolean,
    ban_change_login_expires: number,
    is_change_avatar_banned: boolean,
    ban_change_avatar_expires: number,
    channel_id: number
}

export interface IBadgesResponse extends IPageableResponse<IBadge> {
    profile: IProfile
}

export interface IEmailChangeConfirmResponse extends IResponse {
    emailHint: string
}

export interface IEmailChangeRequest {
    oldEmail: string,
    newEmail: string,
    password: string
}

export interface ILoginInfoResponse extends IResponse {
    login: string,
    avatar: string,
    is_change_avaliable: boolean,
    last_change_at: number,
    next_change_avaliable_at: number
}

export interface INewLogin {
    '@id': number,
    id: number,
    newLogin: string,
    timestamp: number
}

export enum PrivacyState {
    All = 0,
    OnlyFriends = 1,
    OnlyMe = 2
}

export enum PrivacyFriendRequestState {
    All = 0,
    OnlyMe = 1
}

export interface IPasswordChangeResponse extends IResponse {
    token: string
}