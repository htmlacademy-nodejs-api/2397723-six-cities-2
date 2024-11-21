import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {DocumentExists} from '../../types/index.js';

export interface CommentService extends DocumentExists {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
