import {Expose} from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public isPro: string;

  @Expose()
  public email: string;
}
