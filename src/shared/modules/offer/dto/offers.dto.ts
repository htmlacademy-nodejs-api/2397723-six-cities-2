import {IsInt} from 'class-validator';

import {OffersValidationMessages} from './offers.messages.js';

export class OffersDto {
  @IsInt({message: OffersValidationMessages.offersAmount.invalidFormat})
  public offersAmount: number;
}
