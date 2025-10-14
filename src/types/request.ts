export interface IBaseRequest {
    path: string,
    json?: object,
    customBaseUrl?: string,
    bearer?: string,
    urlEncoded?: object,
    queryParams?: object,
    token?: string,
    signal?: AbortSignal,
    method?: string,
    tokenRequired?: boolean,
    apiV2?: boolean,
    image?: {
        name: string,
        stream: Buffer,
        boundary?: string,
        type: "file" | "image"
    }
}

export interface IBaseApiParams {
    token?: string,
    signal?: AbortSignal
}

export interface IBaseRequestPageable {
    page: number
}

export interface IBaseSearchRequest extends IBaseRequestPageable {
    query: string,
    searchBy: number
}

export interface IBaseCommentAddRequest {
    parentCommentId?: number | null,
    replyToProfileId?: number | null,
    message: string,
    isSpoiler: boolean
}