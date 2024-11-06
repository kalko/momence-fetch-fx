import mongoose from "mongoose"

export interface IRateMongo extends mongoose.Document {
  code: number
  country: string
  currency: string
  amount: number
  rate: string
  forDate: Date
  fetchDatetime: Date
}

const currencyRateSchema = new mongoose.Schema({
  code: { type: String, required: true },
  country: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  rate: { type: Number, required: true },
  forDate: { type: Date, required: true }, // date for which the rates are published
  fetchDatetime: { type: Date, required: true }, // date when data was fetched
})

// Use existing model if already defined
export const CurrencyRate =
  (mongoose.models.CurrencyRate as mongoose.Model<IRateMongo>) ||
  mongoose.model<IRateMongo>("CurrencyRate", currencyRateSchema)
