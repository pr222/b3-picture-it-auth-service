/**
 * Main router point for sub-routers.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

router.use('/api/v1/auth', v1Router)

router.use('*', (req, res, next) => {
  return next(createError(404, 'Not Found'))
})
