import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {User} from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({required: true, type: () => String})
  public name: string;

  @prop({required: true, type: () => String})
  public avatarUrl: string;

  @prop({required: true, type: () => Boolean})
  public isPro: boolean;

  @prop({required: true, unique: true, type: () => String})
  public email: string;

  @prop({required: true, type: () => String})
  public token: string;

  @prop({required: true, default: '', type: () => String})
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.avatarUrl = userData.avatarUrl;
    this.isPro = userData.isPro;
    this.email = userData.email;
    this.token = userData.token;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
