import { IProfile } from "./profile";
import { IRelease } from "./release";
import { IResponse } from "./response";
import { IBaseRequestPageable } from "./request";
import { BaseComment } from "../classes/BaseComment";

export interface ICollection {
    '@id': number;
    id: number;
    creator: IProfile;
    title: string;
    description: string;
    image: string;
    creation_date: number;
    last_update_date: number;
    comment_count: number;
    favorites_count: number;
    is_private: boolean;
    is_deleted: boolean;
    is_favorite: boolean;
    releases: IRelease[];
}

export interface ICollectionResponse extends IResponse {
    collection: ICollection,
    watching_count: number,
    plan_count: number,
    completed_count: number,
    hold_on_count: number,
    dropped_count: number
}

export interface IReleaseInCollectionRequest extends IBaseRequestPageable {
    id: number,
    sort: number
}

export interface ICollectionCreateRequest {
    title: string,
    description: string,
    releases: number[],
    is_private: boolean
}

export interface ICollectionComment extends BaseComment {
    collection: ICollection
}