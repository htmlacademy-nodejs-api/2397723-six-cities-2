import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({required: true, type: String})
  public text: string;

  @prop({required: true, type: Number})
  public rating: string;

  @prop({required: true, ref: () => UserEntity, type: String})
  public authorId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
