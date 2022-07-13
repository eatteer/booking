import { Schema, model } from "mongoose";
import { Role } from "./Role";

export interface User {
  username: string
  email: string
  password: string
  roles: Role[]
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }],
}, { timestamps: true })

export default model<User>("User", UserSchema)