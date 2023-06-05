import { Document, Model, model, Schema } from 'mongoose'

export interface IFile extends Document {
  name: string;
  url: string;
  accessCode: string;
  owner: Schema.Types.ObjectId;
}

const FileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  accessCode: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

const File: Model<IFile> = model("File", FileSchema)
export default File