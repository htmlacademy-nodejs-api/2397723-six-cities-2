import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {City, Location, OfferGood} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

class LocationEntity {
  @prop({required: true, type: Number})
  public latitude: number;

  @prop({required: true, type: Number})
  public longitude: number;

  @prop({required: true, type: Number})
  public zoom: number;
}

class CityEntity {
  @prop({required: true, type: String})
  public name: string;

  @prop({required: true, type: LocationEntity})
  public location: LocationEntity;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({required: true, type: String})
  public title: string;

  @prop({required: true, type: String})
  public type: string;

  @prop({required: true, type: Number})
  public price: number;

  @prop({required: true, type: CityEntity})
  public city: City;

  @prop({required: true, type: LocationEntity})
  public location: Location;

  @prop({required: true, type: Boolean})
  public isFavorite: boolean;

  @prop({required: true, type: Boolean})
  public isPremium: boolean;

  @prop({required: true, type: Number})
  public rating: number;

  @prop({required: true, type: String})
  public description: string;

  @prop({required: true, type: Array})
  public images: string[];

  @prop({required: true, type: String})
  public previewImage: string;

  @prop({type: Array})
  public goods: OfferGood[];

  @prop({required: true, ref: () => UserEntity, type: String})
  public hostId: Ref<UserEntity>;

  @prop({required: true, type: Number})
  public bedrooms: number;

  @prop({required: true, type: Number})
  public maxAdults: number;

  @prop({required: true, type: Number})
  public commentsCount: number;
}

export const OfferModel = getModelForClass(OfferEntity);
