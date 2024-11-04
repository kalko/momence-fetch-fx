import axios from "axios"
import moment from "moment"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

import { parseCNBData } from "../src/helpers/rates"
import { CurrencyRate } from "../src/model/currencyRate"

const apiUrl = "http://localhost:3010"

describe("parseCNBData", () => {
  it("should correctly parse the CNB data string", () => {
    const inputData = `04 Nov 2024 #214
          Country|Currency|Amount|Code|Rate
          Australia|dollar|1|AUD|15.306
          Brazil|real|1|BRL|3.992
          Bulgaria|lev|1|BGN|12.928`

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
  let mock
  let mongoServer

  // Sample mock data
  const mockRates = [
    {
      code: "SEK",
      country: "Sweden",
      currency: "krona",
      amount: 1,
      rate: 2.228,
      forDate: new Date("2024-10-10T00:00:00.000Z"),
      fetchDatetime: new Date("2024-11-04T14:01:24.375Z"),
    },
    {
      code: "USD",
      country: "United States",
      currency: "dollar",
      amount: 1,
      rate: 1.0,
      forDate: new Date("2024-10-10T00:00:00.000Z"),
      fetchDatetime: new Date("2024-11-04T14:01:24.375Z"),
    },
  ]

  // Start in-memory MongoDB before tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  // Clean up and close the database after tests
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    // Clear the database before each test
    await CurrencyRate.deleteMany({})
    // Seed the database with mock data
    await CurrencyRate.insertMany(mockRates)
  })

  it("should fetch all currency rates from the database", async () => {
    const response = await axios.get(`${apiUrl}/rates`)

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data).toEqual(expect.arrayContaining(mockRates))
  })

  it("should fetch rates for a specific date from the database", async () => {
    const response = await axios.get(`${apiUrl}/rates/2024-10-10`)

    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data).toEqual(expect.arrayContaining(mockRates))
  })

  it("should update rates for the current day in the database", async () => {
    const response = await axios.post(`${apiUrl}/rates`, {
      // Data to simulate the update (structure according to your requirements)
      code: "USD-test",
      country: "United States",
      currency: "dollar",
      amount: 1,
      rate: 1.0,
      forDate: new Date("2024-11-04T00:00:00.000Z"),
      fetchDatetime: new Date("2024-11-04T14:01:24.375Z"),
    })

    expect(response.status).toBe(200)

    // Check if the new rate was added
    const rates = await CurrencyRate.find({ forDate: new Date("2024-11-04") })
    expect(rates.length).toBe(1)
    expect(rates[0].code).toBe("USD-test")
  })
})
