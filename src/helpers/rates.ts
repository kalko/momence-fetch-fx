import axios from "axios"
import moment from "moment"
import { CurrencyRate } from "../model/currencyRate"
import { IRate } from "../types/rates"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

const parseForDate = (data: any) => {
  // extract publised date
  const forDateStr = data.split("\n")[0].split(" ").slice(0, -1).join(" ")

  // convert to date
  const forDate = moment.utc(forDateStr, "DD MMM YYYY").toDate()
  //   const forDate = moment(forDateStr, "DD MMM YYYY").utc().format("YYYY-MM-DD") // formated string

  console.log(forDateStr)
  console.log(forDate)
  return forDate
}

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  const { forDate, rates } = parseCNBData(response.data)

  console.log(forDate)

  // update data - will keep only current / actual data
  await CurrencyRate.deleteMany({ forDate })
  await CurrencyRate.insertMany(rates)

  const storedRates = await getRates()

  //   console.log("Stored Rates", storedRates)

  return rates
}

export const fetchRatesByDate = async (date: string) => {
  const url = `${BASE_URL}?date=${date}`
  const response = await axios.get(url)

  const { forDate, rates } = parseCNBData(response.data)

  console.log(forDate)

  //   await CurrencyRate.deleteMany({ rateDate: forDate })
  //   await CurrencyRate.insertMany(rates)

  return rates
}

export const getRates = async () => {
  return await CurrencyRate.find({})
}

const parseCNBData = (data: string): IRate[] => {
  const dataRows = data
    .split("\n")
    .filter((row) => row.trim() !== "")
    .slice(2)

  // extract publised date
  const forDateStr = data.split("\n")[0].split(" ").slice(0, -1).join(" ")
  // convert to date
  const forDate = moment.utc(forDateStr, "DD MMM YYYY").toDate()

  const rates = dataRows.map((row) => {
    const [country, currency, amount, code, rate] = row.split("|")
    return {
      country,
      currency,
      amount: parseFloat(amount),
      code,
      rate: parseFloat(rate),
      forDate,
      fetchDatetime: new Date(),
    }
  })

  return { forDate, rates }
}
