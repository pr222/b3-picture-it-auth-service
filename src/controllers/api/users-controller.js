/**
 * UsersController-module.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { User } from '../../models/user.js'

/**
 * Encapsulation of controller for users.
 */
export class UsersController {
  /**
   * Perform a login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.email, req.body.password)

      const payload = {
        email: user.email
      }

      const base64 = process.env.ACCESS_TOKEN_SECRET

      const privateKey = Buffer.from(base64, 'base64')

      const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: token
        })
    } catch (error) {
      const err = createHttpError(401, 'Invalid credentials')

      err.innerException = error

      next(err)
    }
  }

  /**
   * Register a new user and save it to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password
      })

      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err

      if (error.name === 'ValidationError') {
        err = createHttpError(400, 'Validation error')
      } else if (error.code === 11000) {
        err = createHttpError(409, 'Duplicated Keys')
      }

      err.innerException = error

      next(err)
    }
  }
}
