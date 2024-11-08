import axios from "axios"
import moment from "moment"
import { CurrencyRate } from "../models/currencyRate"
import { ICNBParsedData } from "../types/rates"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  console.log("Fetching rates from, ", BASE_URL)

  const { forDate, rates } = parseCNBData(response.data)

  // update data - will keep only current / actual data
  await CurrencyRate.deleteMany({ forDate })
  await CurrencyRate.insertMany(rates)
}

export const fetchRatesByDate = async (dateString: string) => {
  const cnbApiLikeDateString = moment(dateString).format("DD.MM.YYYY")
  const url = `${BASE_URL}?date=${cnbApiLikeDateString}`
  const response = await axios.get(url)

  console.log("Fetching rates from, ", url)

  const { forDate, rates } = parseCNBData(response.data)

  // update data - will keep only current / actual data
  await CurrencyRate.deleteMany({ forDate })
  await CurrencyRate.insertMany(rates)
}

export const getRates = async (forDate?: Date) => {
  return await CurrencyRate.find(forDate ? { forDate } : {}).select("-_id -__v")
}

export const parseCNBData = (data: string): ICNBParsedData => {
  const dataRows = data
    .split("\n")
    .filter((row) => row.trim() !== "")
    .slice(2)

  // extract published date
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
