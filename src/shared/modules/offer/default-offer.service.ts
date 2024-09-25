import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel
      .create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findAll(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('hostId')
      .exec();
  }

  public async updateById(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('hostId')
      .exec();
    this.logger.info(`Offer updated: ${offerId}`);

    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId);
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true});
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isFavorite: true});
  }

  public async changeFavoritesStatus(offerId: string, favoriteStatus: boolean): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: favoriteStatus})
      .populate('hostId')
      .exec();
    this.logger.info(`Favorite status changed: ${favoriteStatus}`);

    return result;
  }
}
