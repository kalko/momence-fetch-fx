import dotenv from "dotenv"
import { connect } from "mongoose"

dotenv.config()

const mongoDbUrl = process.env.MONGO_DB_URL || "mongodb://mongo:27017"
// const mongoDbUrl = process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017"

export const connectMongoDb = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await connect(mongoDbUrl)
    }

    console.log("Connected to mongoDB, ", mongoDbUrl)
  } catch (err) {
    console.error("Error", err)
  }
}
