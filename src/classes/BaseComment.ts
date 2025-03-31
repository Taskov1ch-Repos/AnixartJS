import { Anixart } from "../client";
import { IBaseComment } from "../types";
import { BaseProfile } from "./BaseProfile";

export class BaseComment {
    public readonly id: number;
    public readonly profile: BaseProfile;
    public readonly message: string;
    public readonly timestamp: Date;
    public readonly type: number;
    public readonly vote: number;
    public readonly parentCommentId: number;
    public readonly voteCount: number;
    public readonly likesCount: number;
    public readonly isSpoiler: boolean;
    public readonly isEdited: boolean;
    public readonly isDeleted: boolean;
    public readonly isReply: boolean;
    public readonly replyCount: number;
    public readonly canLike: boolean;

    public constructor(protected readonly client: Anixart, comment: IBaseComment) { 
        this.id = comment.id;
        this.profile = new BaseProfile(this.client, comment.profile);
        this.message = comment.message;
        this.timestamp = new Date(comment.timestamp * 1000);
        this.type = comment.type;
        this.vote = comment.vote;
        this.parentCommentId = comment.parent_comment_id;
        this.voteCount = comment.vote_count;
        this.likesCount = comment.likes_count;
        this.isSpoiler = comment.is_spoiler;
        this.isEdited = comment.is_edited;
        this.isDeleted = comment.is_deleted;
        this.isReply = comment.is_reply;
        this.replyCount = comment.reply_count;
        this.canLike = comment.can_like;
    }
}