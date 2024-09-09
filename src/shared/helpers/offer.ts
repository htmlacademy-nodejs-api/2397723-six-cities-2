import {Offer, OfferGood, OfferType, Goods} from '../types/index.js';

export function createOffer(offerData: string): Offer {
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
    userAvatar,
    userIsPro,
    userEmail,
    userToken,
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
    avatarUrl: userAvatar,
    isPro: userIsPro === 'true',
    email: userEmail,
    token: userToken
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
