import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../types/index.js';
import {CommentService} from './comment-service.interface.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {fillDTO} from '../../helpers/index.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {CreateOfferDto, OfferServiceInterface} from '../offer/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(CreateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(req.params.id);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
