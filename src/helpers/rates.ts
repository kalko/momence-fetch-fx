import axios from "axios"

const BASE_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"

export const fetchLatestRates = async () => {
  const response = await axios.get(BASE_URL)

  //   console.log(response)

  //   data: '01 Nov 2024 #213\n' +
  //   'Country|Currency|Amount|Code|Rate\n' +
  //   'Australia|dollar|1|AUD|15.323\n' +
  //   'Brazil|real|1|BRL|4.031\n' +
  //   'Bulgaria|lev|1|BGN|12.948\n' +
  //   'Canada|dollar|1|CAD|16.731\n' +

  const forDate = response.data.split("\n")[0]
  console.log(forDate)

  const headers = response.data.split("\n")[1]
  console.log(headers)

  const data = response.data.split("\n").slice(2)
  console.log(data)

  const rates = parseCNBData(response.data)
  console.log(rates)
}

const parseCNBData = (data: string) => {
  const lines = data.split("\n").slice(2)
  const rates = lines.map((line) => {
    const [country, currency, amount, code, rate] = line.split("|")
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
