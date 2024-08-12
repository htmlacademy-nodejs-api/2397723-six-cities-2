import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {Offer, OfferGood, OfferType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, type, price, cityName, cityLocationLatitude, cityLocationLongitude, cityLocationZoom, locationLatitude, locationLongitude, locationZoom, isFavorite, isPremium, rating, description, images, previewImage, goods, userName, userAvatar, userIsPro, userEmail, userToken, bedrooms, maxAdults]) => ({
        id: '1',
        title,
        type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
        price: Number(price),
        city: {
          name: cityName,
          location: {
            latitude: Number(cityLocationLatitude),
            longitude: Number(cityLocationLongitude),
            zoom: Number(cityLocationZoom)
          },
        },
        location: {
          latitude: Number(locationLatitude),
          longitude: Number(locationLongitude),
          zoom: Number(locationZoom)
        },
        isFavorite: isFavorite === 'true',
        isPremium: isPremium === 'true',
        rating: Number(rating),
        description,
        images: images.split(','),
        previewImage,
        goods: goods.split(',').map((good) => OfferGood[good.trim() as 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge']),
        host: {
          name: userName,
          avatarUrl: userAvatar,
          isPro: userIsPro === 'TRUE',
          email: userEmail,
          token: userToken
        },
        bedrooms: Number(bedrooms),
        maxAdults: Number(maxAdults)
      }));
  }
}
