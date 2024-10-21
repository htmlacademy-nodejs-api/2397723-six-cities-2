import {inject, injectable} from 'inversify';
import {CommentService} from './comment-service.interface.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentEntity} from './comment.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {MAX_COMMENTS_AMOUNT} from '../../const/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    await this.commentModel
      .aggregate([
        {
          $group: {
            _id: null,
            averageRating: {$avg: '$rating'},
          },
          $lookup: {
            from: 'offers',
            pipeline: [
              {$match: {_id: '$offerId'}},
              {$project: {rating: '$averageRating'}}
            ],
            as: 'offer',
          },
          $unset: 'averageRating',
        }
      ]);

    this.logger.info(`New comment created: ${dto.text}`);

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
