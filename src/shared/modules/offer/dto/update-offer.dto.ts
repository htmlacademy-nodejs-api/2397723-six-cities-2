import {City, Location, OfferGood, OfferType} from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public type?: OfferType;
  public price?: number;
  public city?: City;
  public location?: Location;
  public isFavorite?: boolean;
  public isPremium?: boolean;
  public rating?: number;
  public description?: string;
  public images?: string[];
  public previewImage?: string;
  public goods?: OfferGood[];
  public bedrooms?: number;
  public maxAdults?: number;
}
