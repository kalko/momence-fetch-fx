import express from "express"
import swaggerUi from "swagger-ui-express"

import { connectMongoDb } from "./database"
import ratesRouter from "./routes/rates"
import swaggerDocs from "./swagger"

const app = express()
const port = 3010

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
  res.send("Hi")
  console.log("Hi")
})

app.use(ratesRouter)

// Conditionally start the server only when not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
    try {
      await connectMongoDb()
    } catch (err) {
      console.error("Error connecting to MongoDB:", err)
    }
  })
}

export default app
