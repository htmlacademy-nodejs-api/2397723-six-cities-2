import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findAll(): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  changeFavoritesStatus(offerId: string, favoriteStatus: boolean): Promise<DocumentType<OfferEntity> | null>;
  incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string): Promise<void>;
}
