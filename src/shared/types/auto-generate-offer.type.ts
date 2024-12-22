import {City} from './city.type.js';
import {Location} from './location.type.js';
import {OfferType} from './offer-type.enum.js';
import {OfferGood} from './offer-good.enum.js';

type AutoGenerateHost = {
  name: string;
  isPro: boolean;
  email: string;
}

export type AutoGenerateOffer = {
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
  host: AutoGenerateHost;
  bedrooms: number;
  maxAdults: number;
}
