import moment from "moment"

import axios from "axios"
import MongoMemoryServer from "mongodb-memory-server-core"
import mongoose from "mongoose"
import { CurrencyRate } from "../dist/model/currencyRate"
import app from "../src/app"
import { parseCNBData } from "../src/helpers/rates"

const apiUrl = "http://localhost:3010"
process.env.NODE_ENV = "test"

describe("parseCNBData", () => {
  it("should correctly parse the CNB data string", () => {
    const inputData =
      "04 Nov 2024 #214\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|15.306\nBrazil|real|1|BRL|3.992\nBulgaria|lev|1|BGN|12.928"
    const expectedOutput = {
      forDate: moment.utc("`04 Nov 2024", "DD MMM YYYY").toDate(),

      rates: [
        {
          country: "Australia",
          currency: "dollar",
          amount: 1,
          code: "AUD",
          rate: 15.306,
          forDate: moment.utc("04 Nov 2024", "DD MMM YYYY").toDate(),
          fetchDatetime: expect.any(Date),
        },
        {
          country: "Brazil",
          currency: "real",
          amount: 1,
          code: "BRL",
          rate: 3.992,
          forDate: moment.utc("04 Nov 2024", "DD MMM YYYY").toDate(),
          fetchDatetime: expect.any(Date),
        },
        {
          country: "Bulgaria",
          currency: "lev",
          amount: 1,
          code: "BGN",
          rate: 12.928,
          forDate: moment.utc("04 Nov 2024", "DD MMM YYYY").toDate(),
          fetchDatetime: expect.any(Date),
        },
      ],
    }

    const result = parseCNBData(inputData)

    expect(result.forDate).toEqual(expectedOutput.forDate)
    expect(result.rates).toHaveLength(expectedOutput.rates.length)

    expectedOutput.rates.forEach((expectedRate, index) => {
      expect(result.rates[index]).toEqual(expect.objectContaining(expectedRate))
    })
  })
})

describe("CNB rates API", () => {
  let mongoServer: MongoMemoryServer
  let server

  const mockRates = [
    {
      code: "SEK",
      country: "Sweden",
      currency: "krona",
      amount: 1,
      rate: 2.228,
      forDate: "2024-10-10T00:00:00.000Z",
      fetchDatetime: "2024-11-04T14:01:24.375Z",
    },
    {
      code: "USD",
      country: "United States",
      currency: "dollar",
      amount: 1,
      rate: 1.0,
      forDate: "2024-10-10T00:00:00.000Z",
      fetchDatetime: "2024-11-04T14:01:24.375Z",
    },
  ]

  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())

    // Start the Express server only once
    server = app.listen(3010, () => {
      console.log("Test server running on port 3010")
    })
  })

  afterAll(async () => {
    // Disconnect from MongoDB and stop the in-memory server
    await mongoose.disconnect()
    await mongoServer.stop()

    // Close the Express server
    server.close()
  })

  beforeEach(async () => {
    // Clear the collection and insert mock data before each test
    await CurrencyRate.deleteMany({})
    await CurrencyRate.insertMany(mockRates)
  })

  // Test for fetching all currency rates
  it("should fetch all currency rates from the database", async () => {
    const response = await axios.get(`${apiUrl}/rates`)

    // Remove MongoDB-specific fields for easier comparison
    const transformedReceived = response.data.map(
      ({ _id, __v, ...rest }) => rest
    )

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(transformedReceived).toEqual(expect.arrayContaining(mockRates))
  })

  // Test for fetching rates by a specific date
  it("should fetch rates for a specific date from the database", async () => {
    const response = await axios.get(`${apiUrl}/rates/2024-10-10`)

    // Remove MongoDB-specific fields
    const transformedReceived = response.data.map(
      ({ _id, __v, ...rest }) => rest
    )

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(transformedReceived).toEqual(expect.arrayContaining(mockRates))
  })
})
