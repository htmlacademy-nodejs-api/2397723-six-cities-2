import {IsString} from 'class-validator';

import {PremiumOffersValidationMessages} from './premium-offers.messages.js';

export class PremiumOffersDto {
  @IsString({message: PremiumOffersValidationMessages.cityName.invalidFormat})
  public cityName: string;
}
