import jwt from 'jsonwebtoken'

class JwtService {
  generateToken(email: string): string {
    return jwt.sign({ iat: new Date().getTime(), expiresIn: 3600, email: email}, 'secret');
  }
}

export default JwtService;