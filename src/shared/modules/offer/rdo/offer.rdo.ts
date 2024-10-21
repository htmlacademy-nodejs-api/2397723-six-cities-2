import {Expose} from 'class-transformer';
import {Ref} from '@typegoose/typegoose';
import {City, Location, OfferGood} from '../../../types/index.js';
import {UserEntity} from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public city: City;

  @Expose()
  public location: Location;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public description: string;

  @Expose()
  public images: string[];

  @Expose()
  public previewImage: string;

  @Expose()
  public goods: OfferGood[];

  @Expose()
  public hostId: Ref<UserEntity>;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public commentCount: number;
}
