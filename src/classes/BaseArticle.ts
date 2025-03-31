import { Channel } from "./Channel";
import { Anixart } from "../client";
import { IArticle, IArticlePayloadBlock} from "../types";
import { FullProfile } from "./FullProfile";


export class BaseArticle {
    public readonly id: number;
    public readonly payloadTime: Date;
    public readonly payloadBlocks: IArticlePayloadBlock[];
    public readonly vote: number;
    public readonly isDeleted: boolean;
    public readonly commentCount: number;
    public readonly repostCount: number;
    public readonly voteCount: number;
    public readonly creationDate: Date;
    public readonly lastUpdateDate: Date;
    public readonly underModerationReason: string;
    public readonly isUnderModeration: boolean;
    public readonly author: FullProfile | null;

    constructor(readonly client: Anixart, articleResponce: IArticle, channel?: Channel) {
        this.id = articleResponce.id;
        this.payloadTime = new Date(articleResponce.payload.time);
        this.author = articleResponce.author ? new FullProfile(this.client, articleResponce.author) : null;
        this.payloadBlocks = articleResponce.payload.blocks;
        this.vote = articleResponce.vote;
        this.commentCount = articleResponce.comment_count;
        this.repostCount = articleResponce.repost_count;
        this.voteCount = articleResponce.vote_count;
        this.creationDate = new Date(articleResponce.creation_date * 1000);
        this.lastUpdateDate = new Date(articleResponce.last_update_date * 1000);
        this.underModerationReason = articleResponce.under_moderation_reason;
        this.isUnderModeration = articleResponce.is_under_moderation;
        this.isDeleted = articleResponce.is_deleted;
    }
}