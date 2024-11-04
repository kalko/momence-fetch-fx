import { Request, Response } from "express"
import moment from "moment"
import { fetchLatestRates, fetchRatesByDate, getRates } from "../helpers/rates"

export const updateLatestRates = async (req: Request, res: Response) => {
  try {
    const rates = await fetchLatestRates()
    console.log("Update current rates succesful")
    res.status(200).json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error updating latest rates" })
  }
}

export const updateRatesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      res.status(400).json({ error: "Invalid date format" })
    }
    const rates = await fetchRatesByDate(date)
    console.log("Update rates by date sucessful")
    res.status(200).json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error updating rates by date" })
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
  try {
    const { date } = req.params
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      res.status(400).json({ error: "Invalid date format" })
    }
    const rateDate = new Date(date)
    const rates = await getRates(rateDate)
    console.log("Get rates by date sucessful")
    res.json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error fetching rates by date" })
  }
}
