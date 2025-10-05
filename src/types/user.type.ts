export interface IUser {
  name: string
  email: string
  password: string
  role: string
  isActive: string
  isDeleted: boolean
  isVerified: boolean
  auth: Auth[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface Auth {
  provider: string
  providerId: string
}