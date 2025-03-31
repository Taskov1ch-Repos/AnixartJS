import { Anixart } from '../client';
import { IEpisode, IRelease, ISource, ResponseCode } from '../types';
import { Source } from './Source';

export class Episode {
    public readonly localId: number;
    public readonly position: number;
    public readonly release: IRelease | number;
    public readonly sourceRaw: ISource | number;
    public readonly name: string;
    public readonly url: string;
    public readonly iframe: boolean;
    public readonly addedDate: Date;
    public readonly isFilter: boolean;
    public readonly isWatched: boolean;

    constructor(private readonly client: Anixart, episode: IEpisode, public readonly source: Source) {
        this.localId = episode["@id"];
        this.position = episode.position;
        this.release = episode.release;
        this.sourceRaw = episode.source;
        this.name = episode.name;
        this.url = episode.url;
        this.iframe = episode.iframe;
        this.addedDate = new Date(episode.addedDate * 1000);
        this.isFilter = episode.is_filter;
        this.isWatched = episode.is_watched;
    }

    public async setWatched(isWatched: boolean): Promise<ResponseCode> {
        const request = isWatched ? 
        await this.client.endpoints.release.markEpisodeAsWatched(this.source.dubber.release.id, this.source.id, this.position) 
        : await this.client.endpoints.release.unmarkEpisodeAsWatched(this.source.dubber.release.id, this.source.id, this.position);

        return request.code;
    }

    public async addToHistory(): Promise<ResponseCode> {
        const request = await this.client.endpoints.release.addToHistory(this.source.dubber.release.id, this.source.id, this.position);

        return request.code;
    }
}