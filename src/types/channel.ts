import { IProfile } from "./profile";
import { IResponse, IBaseComment } from "./response";

export interface IChannel {
    id: number,
    title: string,
    description: string,
    avatar: string,
    cover: string,
    permission: number,
    article_count: number,
    subscriber_count: number,
    creation_date: number,
    last_update_date: number,
    is_blog: boolean,
    is_commenting_enabled: boolean,
    is_article_suggestion_enabled: boolean,
    is_verified: boolean,
    is_deleted: boolean,
    blog_profile_id: number,
    is_subscribed: boolean,
    is_blocked: boolean,
    block_reason: string,
    block_expire_date: number,
    is_perm_blocked: boolean,
    is_administrator_or_higher: boolean
}

export interface IArticleUploadFileResponse extends IResponse {
    file: IArticleImageItem,
    success: number
}

export interface IArticleSuggestionPublishResponse extends IResponse {
    article_id: number
}

export interface IChannelResponse extends IResponse {
    channel: IChannel,
    suggestion_count: number
}

export interface IChannelCreateRequest {
    title: string,
    description: string,
    is_article_suggestion_enabled: boolean,
    is_commenting_enabled: boolean
}

export interface ISubsciptionCountResponse extends IResponse {
    subscription_count: number
}

export interface IArticleCommentResponce extends IResponse {
    comment: IArticleComment
}

export interface IArticleTextBlock {
    text: string,
    text_length: number
}

export interface IArticleHeaderBlock  {
    text: string,
    text_length: number,
    level: number
}

export interface IArticleImageItem {
    id: string,
    url: string,
    hash: string,
    width: number,
    height: number
}

export interface IArticleImageBlock {
    items: IArticleImageItem[],
    item_count: number
}

export interface IArticleQuoteBlock {
    text: string,
    caption: string,
    alignment: string,
    text_length: number,
    caption_length: number
}

export interface IArticleListBlock {
    style: string,
    items: string[],
    item_count: number
}

export interface IArticleEmbedBlock {
    url: string,
    hash: string,
    embed: string,
    width: number,
    height: number,
    image: string,
    title: string,
    service: string,
    site_name: string,
    description: string
}

export interface IArticlePayloadBlock {
    id: string,
    data: IArticleTextBlock | IArticleImageBlock | IArticleHeaderBlock | IArticleQuoteBlock | IArticleListBlock | IArticleEmbedBlock | {},
    name: string,
    type: string
}

export interface IArticleCreateRequest {
    repost_article_id: number | null,
    payload: {
        time: number,
        version: string,
        blocks: IArticlePayloadBlock[],
        block_count: number
    }
}

export interface IArticleSuggestionCreateRequest extends Omit<IArticleCreateRequest, 'repost_article_id'>{}

export interface IEmbedData extends IResponse {
    success: number,
    hash: string,
    site_name: string,
    title: string,
    description: string,
    image: string,
    embed: string,
    width: number,
    height: number,
    url: string
}

export interface IArticleResponse extends IResponse {
    article: IArticle
}

export interface IArticleCreateResponse extends IResponse {
    article: IArticle
}

export interface IArticle {
    id: number,
    channel: IChannel,
    author: IProfile,
    payload: {
        time: number,
        blocks: IArticlePayloadBlock[]
    },
    vote: number,
    repost_article: IArticle,
    comment_count: number,
    repost_count: number,
    vote_count: number,
    creation_date: number,
    last_update_date: number,
    is_deleted: boolean,
    under_moderation_reason: string | null,
    is_under_moderation: boolean
    contains_repost_article: boolean
}

export interface IChannelBlockManageRequest {
    target_profile_id: number,
    is_blocked: boolean,
    reason: string | null,
    expire_date: number | null,
    is_reason_showing_enabled: boolean,
    is_perm_blocked: boolean
}

export interface IChannelBlockInfo {
    "@id": number,
    reason: string | null,
    added_date: number,
    expire_date: number | null,
    is_reason_showing_enabled: boolean,
    is_perm_blocked: boolean
}

export interface IChannelBlockInfoResponse extends IResponse {
    channel_block: IChannelBlockInfo | null
}

export interface IChannelSearchRequest {
    query: string,
    permission: number,
    is_blog: boolean,
    is_subscibed: boolean
}

export interface IArticleComment extends IBaseComment {
    article: IArticle
}

export interface IChannelMediaTokenResponse extends IResponse {
    media_upload_token: string
}