import jwt from 'jsonwebtoken'
import User from '../app/models/User.js'

function revokedTokenKey(token) {
  return `auth:revoked:${token}`
}

function bearerTokenFromReq(req) {
  const authHeader = req?.headers?.authorization
  if (!authHeader) return null
  const value = String(authHeader)
  if (!value.toLowerCase().startsWith('bearer ')) return null
  const token = value.slice(7).trim()
  return token || null
}

export function signToken(payload, config) {
  return jwt.sign(payload, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpiresIn })
}

export function authMiddleware(container) {
  const config = container.make('config')
  return async (req, res, next) => {
    const token = bearerTokenFromReq(req)
    if (!token) return res.unauthorized('Missing bearer token')
    try {
      const cache = container.make('cache')
      const revoked = await cache.get(revokedTokenKey(token), null)
      if (revoked) return res.unauthorized('Token revoked')

      const payload = jwt.verify(token, config.auth.jwtSecret)
      const userId = payload?.id
      if (!userId) return res.unauthorized('Invalid token')

      const user = await User.find(userId)
      if (!user) return res.unauthorized('Unauthorized')

      req.token = token
      req.auth = { token, payload }
      req.user = user
      return next()
    } catch {
      return res.unauthorized('Invalid token')
    }
  }
}

export function roleGuard(...roles) {
  return async (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.unauthorized('Forbidden')
    return next()
  }
}
