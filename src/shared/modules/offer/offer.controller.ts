import {inject, injectable} from 'inversify';
import {isValidObjectId} from 'mongoose';
import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {fillDTO} from '../../helpers/index.js';
import {OfferService} from './offer-service.interface.js';
import {CreateOfferRequest} from './create-offer-request.type.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {PremiumOffersRequest} from './premium-offers-request.type.js';
import {ChangeFavoriteStatusRequest} from './change-favorite-status-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.showAll});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.premium});
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.favorites});
    this.addRoute({path: '/favorites', method: HttpMethod.Patch, handler: this.changeFavoriteStatus});
    this.addRoute({path: '/:id', method: HttpMethod.Get, handler: this.details});
    this.addRoute({path: '/:id', method: HttpMethod.Patch, handler: this.edit});
    this.addRoute({path: '/:id', method: HttpMethod.Delete, handler: this.delete});
  }

  public async showAll(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.findAll();
    this.ok(res, result);
  }

  public async create(
    {body}: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
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

  public async details(req: Request, res: Response): Promise<void> {
    if (isValidObjectId(req.params.id)) {
      const result = await this.offerService.findById(req.params.id);
      this.ok(res, fillDTO(OfferRdo, result));
    }
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(req.params.id, req.body);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.id);
    this.ok(res, fillDTO(OfferRdo, result));
    //TODO обработка ошибок
  }
}
