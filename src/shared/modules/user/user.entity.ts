import {setLogLevel, defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';

setLogLevel('debug');


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({unique: true, default: ''})
  public name: string;

  public avatarUrl: string;

  public isPro: boolean;

  public email: string;

  public token: string;

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
