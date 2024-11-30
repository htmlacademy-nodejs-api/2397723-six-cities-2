import {inject, injectable} from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {fillDTO} from '../../helpers/index.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {CreateOfferRequest} from './create-offer-request.type.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {PremiumOffersRequest} from './premium-offers-request.type.js';
import {ChangeFavoriteStatusRequest} from './change-favorite-status-request.type.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {PremiumOffersDto} from './dto/premium-offers.dto.js';
import {ChangeFavoriteStatusDto} from './dto/change-favorite-status.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware((CreateOfferDto)),
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.premium,
      middlewares: [new ValidateDtoMiddleware(PremiumOffersDto)]
    });
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.favorites});
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Patch,
      handler: this.changeFavoriteStatus,
      middlewares: [
        new ValidateDtoMiddleware(ChangeFavoriteStatusDto),
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('id'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Patch,
      handler: this.edit,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async index(
    {tokenPayload}: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.findAll();
    if (!tokenPayload) {
      result.map((item) => (item.isFavorite = false));
    }
    this.ok(res, result);
  }

  public async create(
    {body, tokenPayload}: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create({...body, hostId: tokenPayload.id});
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async premium(
    {body}: PremiumOffersRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.findPremium(body.cityName);
    this.ok(res, result);
  }

  public async favorites(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findFavorites();
    this.ok(res, result);
  }

  public async changeFavoriteStatus(
    {body}: ChangeFavoriteStatusRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.changeFavoritesStatus(body.offerId, body.favoriteStatus);
    this.ok(res, result);
  }

  public async show(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findById(req.params.id);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(req.params.id, req.body);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.id);
    this.ok(res, fillDTO(OfferRdo, result));
  }
}
