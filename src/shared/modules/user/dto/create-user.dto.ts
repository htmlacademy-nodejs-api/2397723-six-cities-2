import {IsBoolean, IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

import {CreateUserValidationMessages} from './create-user.messages.js';

export class CreateUserDto {
  @IsString({message: CreateUserValidationMessages.name.invalidFormat})
  @MinLength(10, {message: CreateUserValidationMessages.name.minLength})
  @MaxLength(100, {message: CreateUserValidationMessages.name.maxLength})
  public name: string;

  @IsString({message: CreateUserValidationMessages.avatarUrl.invalidFormat})
  public avatarUrl: string;

  @IsBoolean({message: CreateUserValidationMessages.isPro.invalidFormat})
  public isPro: boolean;

  @IsEmail({}, {message: CreateUserValidationMessages.email.invalidFormat})
  public email: string;

  @IsString({message: CreateUserValidationMessages.email.invalidFormat})
  public password: string;
}
