/**
 * Configuration of mongoose.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

/**
 * Try to establish a database connection.
 *
 * @returns {Promise} - Resolves when connection succeed.
 */
export const connectDB = async () => {
  mongoose.connection.once('open', () =>
    console.log('Connection to Mongoose is now open.')
  )

  mongoose.connection.on('error', err =>
    console.error(`A connection error with Mongoose: ${err}`)
  )

  mongoose.connection.on('disconnected', () =>
    console.log('Connection with Mongoose was lost.')
  )

  mongoose.connection.on('reconnected', () =>
    console.log('Connection with Moongoose has been reconnected.')
  )

  process.on('SIGINT', () => {
    console.log('The application was closed, therefore disconnecting Mongoose.')
    process.exit(0)
  })

  // Make the connection
  return mongoose.connect(process.env.CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
