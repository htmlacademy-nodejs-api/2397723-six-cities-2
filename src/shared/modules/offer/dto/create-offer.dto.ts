import {Type} from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize, ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt, IsMongoId,
  IsNumber, IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import {City, Location, OfferGood, OfferType} from '../../../types/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {CityAndLocationValidationMessages} from './city-and-location.messages.js';
import {CityValidate, LocationValidate} from './city-and-location.dto.js';

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.title.minLength})
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @IsEnum(OfferType, {message: CreateOfferValidationMessage.type.invalid})
  public type: OfferType;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @Type(() => CityValidate)
  @ValidateNested({message: CityAndLocationValidationMessages.city.invalid})
  public city: City;

  @Type(() => LocationValidate)
  @ValidateNested({message: CityAndLocationValidationMessages.location.invalid})
  public location: Location;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsNumber({maxDecimalPlaces: 1}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.price.minValue})
  @Max(5, {message: CreateOfferValidationMessage.price.maxValue})
  public rating: number;

  @IsString({message: CreateOfferValidationMessage.description.invalidFormat})
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalid})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.images.length})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.length})
  @IsString({each: true, message: CreateOfferValidationMessage.images.invalidItem})
  public images: string[];

  @IsString({message: CreateOfferValidationMessage.image.invalidFormat})
  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.offerGood.invalid})
  @IsEnum(OfferGood, {each: true, message: CreateOfferValidationMessage.offerGood.invalidType})
  @ArrayUnique({message: CreateOfferValidationMessage.offerGood.unique})
  public goods: OfferGood[];

  @IsMongoId({message: CreateOfferValidationMessage.hostId.invalidId})
  public hostId: string;

  @IsInt({message: CreateOfferValidationMessage.bedrooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.maxValue})
  public bedrooms: number;

  @IsInt({message: CreateOfferValidationMessage.maxAdults.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: CreateOfferValidationMessage.maxAdults.maxValue})
  public maxAdults: number;

  @IsInt()
  public commentsCount: number;
}
