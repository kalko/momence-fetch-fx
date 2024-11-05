import express from "express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { connectMongoDb } from "./database"
import {
  getAllRates,
  getRatesByDate,
  updateLatestRates,
  updateRatesByDate,
} from "./routes/rates"

const app = express()
const port = 3010

app.use(express.json())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Momence Fetch FX API",
      version: "1.0.0",
      description: "API to fetch and store FX rates from CNB",
    },
    servers: [
      {
        servers: [
          {
            url:
              process.env.NODE_ENV === "production"
                ? "https://momence-fetch-fx.up.railway.app"
                : "http://localhost:3010",
          },
        ],
      },
    ],
  },
  apis: ["./dist/app.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
  res.send("Hi")
  console.log("Hi")
})

/**
 * @swagger
 * /update/latest:
 *   post:
 *     summary: Update latests FX rates
 *     responses:
 *       200:
 *         description: Rates updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Latest rates updated successfully"
 */
app.post("/update/latest", updateLatestRates)

/**
 * @swagger
 * /update/{date}:
 *   post:
 *     summary: Update FX rates for a specific date
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rates updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Rates for 2024-11-05 updated successfully"
 */
app.post("/update/:date", updateRatesByDate)

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: List all FX rates
 *     responses:
 *       200:
 *         description: A list of FX rates
 *         content:
 *           application/json:
 *             example:
 *               - currency: "AUD"
 *                 rate: 15.306
 *                 amount: 1
 *                 country: "Australia"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BRL"
 *                 rate: 3.992
 *                 amount: 1
 *                 country: "Brazil"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BGN"
 *                 rate: 12.928
 *                 amount: 1
 *                 country: "Bulgaria"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"

 */
app.get("/rates", getAllRates)

/**
 * @swagger
 * /rates/{date}:
 *   get:
 *     summary: List FX rates for a specific date
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of FX rates for the specified date
 *         content:
 *           application/json:
 *             example:
 *               - currency: "AUD"
 *                 rate: 15.306
 *                 amount: 1
 *                 country: "Australia"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BRL"
 *                 rate: 3.992
 *                 amount: 1
 *                 country: "Brazil"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BGN"
 *                 rate: 12.928
 *                 amount: 1
 *                 country: "Bulgaria"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 */
app.get("/rates/:date", getRatesByDate)

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
