import { Anixart } from '../client';
import { ICommentRelease, Writable, ResponseCode, VoteType } from '../types';
import { BaseComment } from './BaseComment';
import { BaseProfile } from './BaseProfile';
import { Release } from './Release';

export class ReleaseComment extends BaseComment {
    public readonly release: Release;

    constructor(readonly client: Anixart, releaseComment: ICommentRelease, releaseClass?: Release) {
        super(client, releaseComment)
        this.release = releaseClass ?? new Release(this.client, releaseComment.release);
    }

        private writeProperties(prop: keyof this, value: any) {
            (<Writable<this>>this)[prop] = value;
        }
    
        public async getVotes(page?: number, sort?: number): Promise<BaseProfile[]> {
            const request = await this.client.endpoints.channel.getVotes(this.id, page ?? 0, sort ?? 2);
    
            return request.content.map(profile => new BaseProfile(this.client, profile));
        }
    
        public async getReplies(page?: number, sort?: number): Promise<ReleaseComment[]> {
            const request = await this.client.endpoints.release.getCommentReplies({id: this.id, page: page ?? 0, sort: sort ?? 2});
    
            return request.content.map(comment => new ReleaseComment(this.client, comment));
        }
    
        public async delete(): Promise<ResponseCode> {
            const request = await this.client.endpoints.release.removeComment(this.id);

            return request.code;
        }
    
        public async setVote(type: VoteType): Promise<ResponseCode> {
            const request = await this.client.endpoints.release.voteComment(this.id, type);
    
            if (request.code == 0) {
                this.writeProperties("vote", type == this.vote ? 0 : type);
            }
    
            return request.code;
        }

        public async edit(content: string, isSpoiler: boolean) {
            const request = await this.client.endpoints.release.editComment(this.id, content, isSpoiler);

            if (request.code == 0) {
                this.writeProperties("message", content);
                this.writeProperties("isSpoiler", isSpoiler);
            }

            return request.code;
        }
}