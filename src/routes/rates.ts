import { Request, Response } from "express"
import moment from "moment"
import { fetchLatestRates, fetchRatesByDate, getRates } from "../helpers/rates"

export const updateLatestRates = async (req: Request, res: Response) => {
  try {
    const rates = await fetchLatestRates()
    console.log("Latest rates updated successfully")
    res.status(200).json("Latest day rates updated successfully")
  } catch (error) {
    res.status(500).json({ error: "Error updating latest rates" })
  }
}

export const updateRatesByDate = async (req: Request, res: Response) => {
  const { date } = req.params
  try {
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      res.status(400).json({ error: "Invalid date format" })
    }
    const rates = await fetchRatesByDate(date)
    console.log(`Rates for ${date} were updated successfully`)
    res.status(200).json(`Rates for ${date} were updated successfully`)
  } catch (error) {
    res.status(500).json({ error: `Error updating rates for date ${date}` })
  }
}

export const getAllRates = async (req: Request, res: Response) => {
  try {
    const rates = await getRates()
    console.log("Get all rates sucessful")
    res.json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error fetching all rates" })
  }
}

export const getRatesByDate = async (req: Request, res: Response) => {
  const { date } = req.params
  try {
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      res.status(400).json({ error: "Invalid date format" })
    }
    const rateDate = new Date(date)
    const rates = await getRates(rateDate)
    console.log(`Get rates for ${date} sucessful`)
    res.json(rates)
  } catch (error) {
    res.status(500).json({ error: `Error fetching rates for date ${date}` })
  }
}
