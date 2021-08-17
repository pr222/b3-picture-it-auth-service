/**
 * Users routes.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import { UsersController } from '../../../controllers/api/users-controller.js'

export const router = express.Router()

const controller = new UsersController()

router.post('/register', (req, res, next) =>
  controller.register(req, res, next))

router.post('/login', (req, res, next) =>
  controller.login(req, res, next))
