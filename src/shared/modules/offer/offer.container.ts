import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';

import {Component} from '../../types/index.js';
import {OfferService} from './offer.service.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {OfferController} from './offer.controller.js';
import {Controller} from '../../libs/rest/index.js';
import {OfferServiceInterface} from './offer-service.interface.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferServiceInterface>(Component.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
