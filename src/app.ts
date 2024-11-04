import express from "express"

import { connectMongoDb } from "./databse"

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
  } catch (err) {
    console.error("Error: ", err)
  }
})
