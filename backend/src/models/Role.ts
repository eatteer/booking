import { Schema, model } from 'mongoose'

export enum Roles {
  Admin = 'admin',
  Client = 'client'
}

export interface Role {
  name: string
}

const RoleSchema = new Schema<Role>({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

export default model<Role>('Role', RoleSchema)