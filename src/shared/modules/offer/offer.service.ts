import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {OfferServiceInterface} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DEFAULT_OFFERS_COUNT, MAX_PREMIUM_OFFERS} from '../../const/index.js';
import {OffersDto} from './dto/offers.dto.js';

@injectable()
export class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    dto.commentsCount = 0;
    const result = await this.offerModel
      .create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findAll(dto: OffersDto = {offersAmount: DEFAULT_OFFERS_COUNT}): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(dto.offersAmount)
      .sort({createdAt: -1})
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['hostId'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['hostId'])
      .exec();
    this.logger.info(`Offer updated: ${offerId}`);

    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isPremium: true, 'city.name': cityName})
      .limit(MAX_PREMIUM_OFFERS)
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true})
      .exec();
  }

  public async changeFavoritesStatus(offerId: string, favoriteStatus: boolean): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: favoriteStatus})
      .populate(['hostId'])
      .exec();
    this.logger.info(`Favorite status changed: ${favoriteStatus}`);

    return result;
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentsCount: 1,
        }
      })
      .exec();
  }

  public async updateRating(offerId: string): Promise<void> {
    const newRating = await this.offerModel
      .aggregate(
        [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', {
                    $toObjectId: offerId
                  }
                ]
              }
            }
          },
          {
            '$lookup': {
              'from': 'comments',
              'let': {
                'offerId': '$offerId'
              },
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$eq': [
                        '$id', '$$offerId'
                      ]
                    }
                  }
                },
                {
                  '$group': {
                    '_id': null,
                    'avgRating': {
                      '$avg': '$rating'
                    }
                  }
                }
              ],
              'as': 'comments'
            }
          },
          {
            '$addFields':
              {
                'rating':
                  {
                    '$arrayElemAt':
                      [
                        '$comments.avgRating', 0
                      ]
                  }
              }
          },
          {
            '$unset': 'comments'
          }
        ]
      ).exec();
    await this.offerModel.findByIdAndUpdate(offerId, {
      rating: newRating[0].rating
    });
    this.logger.info('Rating updated');
  }
}
