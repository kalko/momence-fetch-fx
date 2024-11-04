import express from "express"

import { connectMongoDb } from "./databse"
import { fetchRatesByDate } from "./helpers/rates"

const app = express()
const port = 3010

app.get("/", (req, res) => {
  res.send("Hi")
  console.log("Hi")
})

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)

  try {
    await connectMongoDb()
    // await fetchLatestRates()
    // daily.txt?date=16.10.2024
    await fetchRatesByDate("10.10.2024")
  } catch (err) {
    console.error("Error: ", err)
  }
})
