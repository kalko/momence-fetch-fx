import express from "express"

import { connectMongoDb } from "./databse"
import {
  getAllRates,
  getRatesByDate,
  updateLatestRates,
  updateRatesByDate,
} from "./routes/rates"

const app = express()
const port = 3010

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hi")
  console.log("Hi")
})

app.post("/update/latest", updateLatestRates)
app.post("/update/:date", updateRatesByDate)
app.get("/rates", getAllRates)
// rates/2024-10-10
app.get("/rates/:date", getRatesByDate)

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)

  try {
    await connectMongoDb()
  } catch (err) {
    console.error("Error: ", err)
  }
})

export default app
