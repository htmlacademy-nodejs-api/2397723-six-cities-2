import {IsBoolean, IsMongoId} from 'class-validator';

import {ChangeFavoriteStatusValidationMessages} from './change-favorite-status.messages.js';

export class ChangeFavoriteStatusDto {
  @IsMongoId({message: ChangeFavoriteStatusValidationMessages.offerId.invalidId})
  public offerId: string;

  @IsBoolean({message: ChangeFavoriteStatusValidationMessages.favoriteStatus.invalidFormat})
  public favoriteStatus: boolean;
}
