import {City} from './city.type.js';
import {Location} from './location.type.js';
import {User} from './user.type.js';
import {OfferType} from './offer-type.enum.js';
import {OfferGood} from './offer-good.enum.js';

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  images: string[];
  previewImage: string;
  goods: OfferGood[];
  host: User;
  bedrooms: number;
  maxAdults: number;
}
