/**
 * The starting point of the application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function.
 */
const main = async () => {
  await connectDB()

  const app = express()
  const PORT = process.env.PORT || 3000

  // Setup logging.
  app.use(logger('dev'))

  // Set HTTP-headers for more security.
  app.use(helmet())

  // Set parsing of application/json.
  app.use(express.json())

  // Set routes.
  app.use('/', router)

  // Handle errors.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Details only in development!
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

  app.listen(PORT, () => {
    console.log(`The server is now running at http://localhost:${PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
