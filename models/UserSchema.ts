import { Document, Model, model, Schema } from 'mongoose'

export interface IUser extends Document {
  mail: string;
  username: string;
  password: string;
  status: string;
  confirmationCode: string;
  confirmationCodeExpiresAt: Date;
}

const UserSchema = new Schema<IUser>({
  mail: { type: String, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Active'], default: 'Pending' },
  confirmationCode: { type: String, required: true },
  confirmationCodeExpiresAt: {type: Date, required: true}
})

const User: Model<IUser> = model("User", UserSchema)
export default User