import {IsInt, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import {City, Location} from '../../../types/index.js';
import {CityAndLocationValidationMessages} from './city-and-location.messages.js';

export class LocationValidate implements Location {
  @IsInt({message: CityAndLocationValidationMessages.location.longitude.invalidFormat})
  public longitude: number;

  @IsInt({message: CityAndLocationValidationMessages.location.latitude.invalidFormat})
  public latitude: number;

  @IsInt({message: CityAndLocationValidationMessages.location.zoom.invalidFormat})
  public zoom: number;
}

export class CityValidate implements City {
  @IsString({message: CityAndLocationValidationMessages.city.name.invalidFormat})
  public name: string;

  @ValidateNested({message: CityAndLocationValidationMessages.location.invalid})
  @Type(() => LocationValidate)
  public location: Location;
}
