import { IDubber, IRelease } from "./release"
import { IProfileShort } from "./profile"

export enum ResponseCode {
    Ok = 0,
    Error = 2,
    InvalidLogin = 3,
    RateLimit = 401,
    Ban = 402,
    PermBan = 403
}

export interface IResponse {
    code: ResponseCode
}

export interface IPageableResponse<T> extends IResponse {
    content: T[],
    total_count: number,
    total_page_count: number,
    current_page: number
}

export interface IScheduleResponse extends IResponse {
    monday: IRelease[],
    tuesday: IRelease[],
    wednesday: IRelease[],
    thursday: IRelease[],
    friday: IRelease[],
    saturday: IRelease[],
    sunday: IRelease[]
}

export interface ITypeResponse extends IResponse {
    types: IDubber[]
}

export interface IBaseComment {
    id: number,
    message: string,
    timestamp: number,
    type: number,
    vote: number,
    profile: IProfileShort,
    parent_comment_id: number,
    vote_count: number,
    likes_count: number,
    is_spoiler: boolean,
    is_edited: boolean,
    is_deleted: boolean,
    is_reply: boolean,
    reply_count: number,
    can_like: boolean
}

export interface IUrlResponse extends IResponse {
    url: string
}