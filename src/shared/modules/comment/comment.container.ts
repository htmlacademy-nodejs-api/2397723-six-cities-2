import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {Component} from '../../types/index.js';
import {CommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';
import {CommentEntity, CommentModel} from './comment.entity.js';

export function createCommentContainer() {
  const offerContainer = new Container();
  offerContainer.bind<CommentService>(Component.OfferService).to(DefaultCommentService).inSingletonScope();
  offerContainer.bind<types.ModelType<CommentEntity>>(Component.OfferModel).toConstantValue(CommentModel);

  return offerContainer;
}
