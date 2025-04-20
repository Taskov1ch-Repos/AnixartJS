import { Anixart } from "../client";
import {
    ICommentRelease,
    ICommentReleaseRequest,
    ICommentReleaseResponse,
    ICommentRepliesRequest,
    IDubbersResponse,
    IRelease,
    IReleaseResponse,
    ISourcesResponse,
    IVideo,
    IVideoReleaseInCategoryRequest,
    IVideoResponse,
    IEpisodesResponse,
    VoteType,
    IEpisodeResponse,
    IBaseApiParams, 
    IBaseCommentAddRequest, 
    IBaseSearchRequest, 
    IPageableResponse, 
    IResponse,
    IReleaseFilterRequest,
    IProfileShort,
    IVideoStreamingPlatform
} from "../types";

/**
 * Класс релиза
 * 
 * TODO: notification
 */
export class Release {
    public constructor(private readonly client: Anixart) { }

    public async info(id: number, extended: boolean = true, options?: IBaseApiParams): Promise<IReleaseResponse> {
        return await this.client.call<IReleaseResponse>({ path: `/release/${id}`, queryParams: { extended_mode: extended }, ...options });
    }

    public async addVote(id: number, vote: 1 | 2 | 3 | 4 | 5, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/release/vote/add/${id}/${vote}`, ...options });
    }

    public async removeVote(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/release/vote/delete/${id}`, ...options });
    }

    public async getComments(data: ICommentReleaseRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICommentRelease>> {
        return this.client.call<IPageableResponse<ICommentRelease>>({ path: `/release/comment/all/${data.id}/${data.page}`, queryParams: { sort: data.sort }, ...options });
    }

    public async addComment(id: number, data: IBaseCommentAddRequest, options?: IBaseApiParams): Promise<ICommentReleaseResponse> {
        return await this.client.call<ICommentReleaseResponse>({ path: `/release/comment/add/${id}`, json: data, ...options });
    }

    public async voteComment(id: number, vote: VoteType, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/release/comment/vote/${id}/${vote}`, ...options });
    }

    public async removeComment(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/release/comment/delete/${id}`, ...options });
    }

    public async editComment(id: number, message: string, spoiler: boolean, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/release/comment/edit/${id}`, json: { message, spoiler }, ...options });
    }

    public async getCommentReplies(data: ICommentRepliesRequest, options?: IBaseApiParams): Promise<IPageableResponse<ICommentRelease>> {
        return await this.client.call<IPageableResponse<ICommentRelease>>({ path: `/release/comment/replies/${data.id}/${data.page}`, queryParams: { sort: data.sort }, ...options });
    }

    public async getRelatedReleases(id: number, page: number,  options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/related/${id}/${page}`, apiV2: true, ...options });
    }

    public async getVideos(id: number, options?: IBaseApiParams): Promise<IVideoResponse> {
        return await this.client.call<IVideoResponse>({ path: `/video/release/${id}`, ...options });
    }

    public async getVideoInCategory(data: IVideoReleaseInCategoryRequest, options?: IBaseApiParams): Promise<IPageableResponse<IVideo>> {
        return await this.client.call<IPageableResponse<IVideo>>({ path: `/video/release/${data.id}/category/${data.categoryId}/${data.page}`, ...options });
    }

    public async search(data: IBaseSearchRequest, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/search/releases/${data.page}`, json: { query: data.query, page: data.page }, apiV2: true, ...options });
    }

    public async getDubbers(id: number, options?: IBaseApiParams): Promise<IDubbersResponse> {
        return await this.client.call<IDubbersResponse>({ path: `/episode/${id}`, ...options });
    }

    public async getDubberSources(id: number, dubberId: number, options?: IBaseApiParams): Promise<ISourcesResponse> {
        return await this.client.call<ISourcesResponse>({ path: `/episode/${id}/${dubberId}`, ...options });
    }

    public async getEpisodes(id: number, dubberId: number, sourceId: number, sort: number = 1, options?: IBaseApiParams): Promise<IEpisodesResponse> {
        return await this.client.call<IEpisodesResponse>({ path: `/episode/${id}/${dubberId}/${sourceId}`, queryParams: { sort }, ...options });
    }

    public async getEpisode(id: number, sourceId: number, episodePosition: number, options?: IBaseApiParams): Promise<IEpisodeResponse> {
        return await this.client.call<IEpisodeResponse>({ path: `/episode/target/${id}/${sourceId}/${episodePosition}`, ...options });
    }

    public async getRandomRelease(extended?: boolean, options?: IBaseApiParams): Promise<IReleaseResponse> {
        return await this.client.call<IReleaseResponse>({ path: `/release/random`, queryParams: { extended_mode: extended ?? true }, ...options });
    }

    public async markEpisodeAsWatched(id: number, sourceId: number, episodePosition: number,  options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/episode/watch/${id}/${sourceId}/${episodePosition}`, ...options });
    }

    public async unmarkEpisodeAsWatched(id: number, sourceId: number, episodePosition: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/episode/unwatch/${id}/${sourceId}/${episodePosition}`, ...options });
    }

    public async addToHistory(id: number, sourceId: number, episodePosition: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/history/add/${id}/${sourceId}/${episodePosition}`, ...options });
    }

    public async removeFromHistory(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/history/delete/${id}`, ...options });
    }

    public async getHistory(page: number, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/history/${page}`, ...options });
    }

    public async filter(page: number, data: IReleaseFilterRequest, extended?: boolean, options?: IBaseApiParams): Promise<IPageableResponse<IRelease>> {
        return await this.client.call<IPageableResponse<IRelease>>({ path: `/filter/${page}`, queryParams: { extended_mode: extended ?? true }, json: data, ...options });
    }

    public async addFavorite(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/favorite/add/${id}`, ...options});
    }

    public async removeFavorite(id: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/favorite/delete/${id}`, ...options});
    }

    public async addToProfileList(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/profile/list/add/${type}/${id}`, ...options});
    }

    public async removeFromProfileList(id: number, type: number, options?: IBaseApiParams): Promise<IResponse> {
        return await this.client.call<IResponse>({ path: `/profile/list/delete/${type}/${id}`, ...options});
    }

    public async getStreaming(id: number, options?: IBaseApiParams): Promise<IPageableResponse<IVideoStreamingPlatform>> {
        return await this.client.call<IPageableResponse<IVideoStreamingPlatform>>({ path: `/release/streaming/platform/${id}`, ...options});
    }

    public async getCommentVotes(id: number, page: number, options?: IBaseApiParams): Promise<IPageableResponse<IProfileShort>> {
        return await this.client.call<IPageableResponse<IProfileShort>>({ path: `/release/comment/votes/${id}/${page}`, ...options})
    }
}