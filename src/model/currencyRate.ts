import mongoose from "mongoose"

const currencyRateSchema = new mongoose.Schema({
  code: { type: String, required: true },
  country: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  rate: { type: Number, required: true },
  rateDate: { type: Date, required: true }, // date for which the rates are published
  fetchDatetime: { type: Date, required: true }, // date when data was fetched
})

export const CurrencyRate = mongoose.model("CurrencyRate", currencyRateSchema)
