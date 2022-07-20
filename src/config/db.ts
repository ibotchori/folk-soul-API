import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const database: any = process.env.MONGO_URI
    const connect: any = await mongoose.connect(database)

    console.log(`MongoDB connected ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB
