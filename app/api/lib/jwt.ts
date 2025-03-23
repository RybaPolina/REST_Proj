import fs from 'fs'
import path from 'path'
import jwt, { SignOptions, Secret, VerifyOptions } from 'jsonwebtoken'

const privateKey = fs.readFileSync(path.join(process.cwd(), 'private.pem'), 'utf8')
const publicKey = fs.readFileSync(path.join(process.cwd(), 'public.pem'), 'utf8')

export function signJwt(payload: object, expiresIn = '1h') {
    return jwt.sign(payload, privateKey as jwt.PrivateKey, {
      algorithm: 'RS256',
      expiresIn,
    } as SignOptions)
  }

  export function verifyJwt(token: string) {
    try {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    } catch {
      return null
    }
  }
  
