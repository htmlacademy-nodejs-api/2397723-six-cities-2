import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {
  generateAvatarPath,
  generateImagesPaths, generatePreviewImagePath,
  generateRandomBoolean,
  generateRandomValue,
  getRandomItem,
  getRandomItems
} from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 1000;

const LOCATION_AFTER_DIGITS = 6;
const MIN_LATITUDE = 50;
const MAX_LATITUDE = 54;
const MIN_LONGITUDE = 4;
const MAX_LONGITUDE = 10;
const MIN_ZOOM = 10;
const MAX_ZOOM = 13;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 10;
const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const type = getRandomItem<string>(this.mockData.type);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const cityName = getRandomItem<string>(this.mockData.city);
    const cityLocationLatitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, LOCATION_AFTER_DIGITS).toString();
    const cityLocationLongitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_AFTER_DIGITS).toString();
    const cityLocationZoom = generateRandomValue(MIN_ZOOM, MAX_ZOOM).toString();
    const locationLatitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, LOCATION_AFTER_DIGITS).toString();
    const locationLongitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_AFTER_DIGITS).toString();
    const locationZoom = generateRandomValue(MIN_ZOOM, MAX_ZOOM).toString();
    const isFavorite = generateRandomBoolean().toString();
    const isPremium = generateRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const description = getRandomItem<string>(this.mockData.description);
    const images = generateImagesPaths().join(',');
    const previewImage = generatePreviewImagePath();
    const goods = getRandomItems<string>(this.mockData.goods).join(',');
    const userName = getRandomItem<string>(this.mockData.users);
    const avatarUrl = generateAvatarPath();
    const userIsPro = generateRandomBoolean();
    const userEmail = getRandomItem<string>(this.mockData.emails);
    const userToken = 'vdgfh';
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);

    return [
      title, type, price, cityName,
      cityLocationLatitude, cityLocationLongitude, cityLocationZoom, locationLatitude,
      locationLongitude, locationZoom, isFavorite, isPremium,
      rating, description, images, previewImage,
      goods, userName, avatarUrl, userIsPro,
      userEmail, userToken, bedrooms, maxAdults
    ].join('\t');
  }
}
