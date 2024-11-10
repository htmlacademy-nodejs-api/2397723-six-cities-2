import {IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

import {CreateCommentValidationMessages} from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentValidationMessages.text.invalidFormat})
  @MinLength(10, {message: CreateCommentValidationMessages.text.minLength})
  @MaxLength(100, {message: CreateCommentValidationMessages.text.maxLength})
  public text: string;

  @IsNumber({maxDecimalPlaces: 1}, {message: CreateCommentValidationMessages.rating.invalidFormat})
  @Min(1, {message: CreateCommentValidationMessages.rating.minValue})
  @Max(5, {message: CreateCommentValidationMessages.rating.maxValue})
  public rating: number;

  @IsMongoId({message: CreateCommentValidationMessages.offerId.invalidId})
  public authorId: string;

  @IsMongoId({message: CreateCommentValidationMessages.offerId.invalidId})
  public offerId: string;
}
