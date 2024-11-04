import axios from "axios"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  const forDate = response.data.split("\n")[0]
  console.log(forDate)

  const headers = response.data.split("\n")[1]
  console.log(headers)

  const rates = parseCNBData(response.data)
  console.log(rates)
}

const parseCNBData = (data: string) => {
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
      fetchDatetime: new Date(),
    }
  })
  return rates
}
