import axios from "axios"
import console from "console"
import moment from "moment"
import { CurrencyRate } from "../model/currencyRate"
import { ICNBParsedData } from "../types/rates"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  const { forDate, rates } = parseCNBData(response.data)

  console.log(forDate)

  // update data - will keep only current / actual data
  await CurrencyRate.deleteMany({ forDate })
  await CurrencyRate.insertMany(rates)

  //   const storedRates = await getRates()
  //   console.log(storedRates)

  return rates
}

export const fetchRatesByDate = async (dateString: string) => {
  const url = `${BASE_URL}?date=${dateString}`
  const response = await axios.get(url)

  const { forDate, rates } = parseCNBData(response.data)

  console.log(forDate)

  await CurrencyRate.deleteMany({ forDate })
  await CurrencyRate.insertMany(rates)
  //   await CurrencyRate.deleteMany()

  //   const currentDate = moment().startOf("day").toDate()
  //   const date: Date = moment.utc(dateString, "DD MMM YYYY").toDate()

  //   console.log("Date", date)

  const storedRates = await getRates()
  //   const storedRates = await getRates(forDate)
  console.log(storedRates)

  return rates
}

export const getRates = async (forDate?: Date) => {
  return await CurrencyRate.find(forDate ? { forDate } : {})
}

const parseCNBData = (data: string): ICNBParsedData => {
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
