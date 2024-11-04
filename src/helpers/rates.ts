import axios from "axios"
import { CurrencyRate } from "../model/currencyRate"
import { IRate } from "../types/rates"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  // extract publised date
  const forDateStr = response.data.split("\n")[0].split(" ")[0]
  // convert to date
  const forDate = new Date(forDateStr)

  const rates = parseCNBData(response.data, forDate)

  await CurrencyRate.insertMany(rates)

  const storedRates = await CurrencyRate.find({})
  console.log("Stored Rates for Date:", storedRates)

  return rates
}

const parseCNBData = (data: string, forDate: Date): IRate[] => {
  const dataRows = data
    .split("\n")
    .filter((row) => row.trim() !== "")
    .slice(2)

  const rates = dataRows.map((row) => {
    const [country, currency, amount, code, rate] = row.split("|")
    return {
      country,
      currency,
      amount: parseFloat(amount),
      code,
      rate: parseFloat(rate),
      rateDate: forDate,
      fetchDatetime: new Date(),
    }
  })

  return rates
}
