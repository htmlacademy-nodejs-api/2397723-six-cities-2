import {OfferGood, OfferType, Goods, AutoGenerateOffer} from '../types/index.js';

export function createOffer(offerData: string): AutoGenerateOffer {
  const [
    title,
    type,
    price,
    cityName,
    cityLocationLatitude,
    cityLocationLongitude,
    cityLocationZoom,
    locationLatitude,
    locationLongitude,
    locationZoom,
    isFavorite,
    isPremium,
    rating,
    description,
    images,
    previewImage,
    goods,
    userName,
    userIsPro,
    userEmail,
    bedrooms,
    maxAdults
  ] = offerData.replace('\n', '').split('\t');

  const city = {
    name: cityName,
    location: {
      latitude: Number(cityLocationLatitude),
      longitude: Number(cityLocationLongitude),
      zoom: Number(cityLocationZoom)
    }
  };

  const location = {
    latitude: Number(locationLatitude),
    longitude: Number(locationLongitude),
    zoom: Number(locationZoom)
  };

  const host = {
    name: userName,
    isPro: userIsPro === 'true',
    email: userEmail,
  };

  return {
    title,
    type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
    price: Number(price),
    city,
    location,
    isFavorite: isFavorite === 'true',
    isPremium: isPremium === 'true',
    rating: Number(rating),
    description,
    images: images.split(','),
    previewImage,
    goods: goods.split(',').map((good) => OfferGood[good.trim() as Goods]),
    host,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults)
  };
}
