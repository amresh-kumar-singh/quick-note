import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
  @Prop()
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ select: false })
  password: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre<UserEntity>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
