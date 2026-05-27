
export interface LoginResponse {
  token: string
  refreshToken: string
  expiresIn: number
  user: {
    id: number
    email: string
    role: string
  }
}