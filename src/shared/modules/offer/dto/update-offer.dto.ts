import {Type} from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize, ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt, IsMongoId,
  IsNumber, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import {City, Location, OfferGood, OfferType} from '../../../types/index.js';
import {UpdateOfferValidationMessages} from './update-offer.messages.js';
import {CityValidate, LocationValidate} from './city-and-location.dto.js';
import {CityAndLocationValidationMessages} from './city-and-location.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: UpdateOfferValidationMessages.title.minLength})
  @MinLength(10, {message: UpdateOfferValidationMessages.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessages.title.maxLength})
  public title?: string;

  @IsOptional()
  @IsEnum(OfferType, {message: UpdateOfferValidationMessages.type.invalid})
  public type?: OfferType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessages.price.invalidFormat})
  @Min(100, {message: UpdateOfferValidationMessages.price.minValue})
  @Max(100000, {message: UpdateOfferValidationMessages.price.maxValue})
  public price?: number;

  @IsOptional()
  @Type(() => CityValidate)
  @ValidateNested({message: CityAndLocationValidationMessages.city.invalid})
  public city?: City;

  @IsOptional()
  @Type(() => LocationValidate)
  @ValidateNested({message: CityAndLocationValidationMessages.location.invalid})
  public location?: Location;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessages.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessages.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsNumber({maxDecimalPlaces: 1}, {message: UpdateOfferValidationMessages.rating.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessages.price.minValue})
  @Max(5, {message: UpdateOfferValidationMessages.price.maxValue})
  public rating?: number;

  @IsOptional()
  @IsString({message: UpdateOfferValidationMessages.description.invalidFormat})
  @MinLength(20, {message: UpdateOfferValidationMessages.description.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessages.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessages.images.invalid})
  @ArrayMinSize(6, {message: UpdateOfferValidationMessages.images.length})
  @ArrayMaxSize(6, {message: UpdateOfferValidationMessages.images.length})
  @IsString({each: true, message: UpdateOfferValidationMessages.images.invalidItem})
  public images?: string[];

  @IsOptional()
  @IsString({message: UpdateOfferValidationMessages.image.invalidFormat})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessages.offerGood.invalid})
  @IsEnum(OfferGood, {each: true, message: UpdateOfferValidationMessages.offerGood.invalidType})
  @ArrayUnique({message: UpdateOfferValidationMessages.offerGood.unique})
  public goods?: OfferGood[];

  @IsOptional()
  @IsMongoId({message: UpdateOfferValidationMessages.hostId.invalidId})
  public hostId?: string;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessages.bedrooms.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessages.bedrooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessages.bedrooms.maxValue})
  public bedrooms?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessages.maxAdults.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessages.maxAdults.minValue})
  @Max(10, {message: UpdateOfferValidationMessages.maxAdults.maxValue})
  public maxAdults?: number;
}
