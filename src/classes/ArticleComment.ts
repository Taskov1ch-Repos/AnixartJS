import { Anixart } from "../client";
import { BaseComment } from "./BaseComment";
import { IArticleComment, ResponseCode, VoteType, Writable } from "../types";
import { Article } from "./Article";
import { BaseProfile } from "./BaseProfile";

export class ArticleComment extends BaseComment {
    public readonly article: Article;

    public constructor(readonly client: Anixart, comment: IArticleComment) {
        super(client, comment);
        this.article = new Article(client, comment.article);
    }

    private writeProperties(prop: keyof this, value: any) {
        (<Writable<this>>this)[prop] = value;
    }

    public async getVotes(page?: number, sort?: number): Promise<BaseProfile[]> {
        const request = await this.client.endpoints.channel.getVotes(this.id, page ?? 0, sort ?? 2);

        return request.content.map(profile => new BaseProfile(this.client, profile));
    }

    public async getReplies(page?: number, sort?: number): Promise<ArticleComment[]> {
        const request = await this.client.endpoints.channel.getCommentReplies(this.id, page ?? 0, sort ?? 2);

        return request.content.map(comment => new ArticleComment(this.client, comment));
    }

    public async delete(): Promise<ResponseCode> {
        const request = await this.client.endpoints.channel.removeArticleComment(this.id);

        return request.code;
    }

    public async setVote(type: VoteType): Promise<ResponseCode> {
        const request = await this.client.endpoints.channel.voteCommentArticle(this.id, type);

        if (request.code == 0) {
            this.writeProperties("vote", type == this.vote ? 0 : type);
        }

        return request.code;
    }
}