import {inject, injectable} from 'inversify';
import {CommentService} from './comment-service.interface.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentEntity} from './comment.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {MAX_COMMENTS_AMOUNT} from '../../const/index.js';
import {OfferService} from '../offer/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment created: ${dto.text}`);

    await this.offerService.incCommentsCount(dto.offerId);
    await this.offerService.updateRating(dto.offerId);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .limit(MAX_COMMENTS_AMOUNT)
      .sort({createdAt: -1})
      .populate(['authorId']);
  }
}
