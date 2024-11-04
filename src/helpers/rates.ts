import axios from "axios"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  //   console.log(response)

  const splitRates = response.data.split("\n")[0]
  console.log(splitRates)

  const headers = response.data.split("\n")[1]
  console.log(headers)

  const data = response.data.split("\n").slice(2)
  console.log(data)

  const rates = data.map((row: any) => {
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
}
