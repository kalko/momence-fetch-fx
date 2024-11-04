import { Request, Response } from "express"
import { fetchLatestRates, fetchRatesByDate, getRates } from "../helpers/rates"

export const updateLatestRates = async (req: Request, res: Response) => {
  try {
    const rates = await fetchLatestRates()
    res.status(200).json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error updating latest rates" })
  }
}

export const updateRatesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params
    const rates = await fetchRatesByDate(date)
    res.status(200).json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error updating rates by date" })
  }
}

export const getAllRates = async (req: Request, res: Response) => {
  try {
    const rates = await getRates()
    res.json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error fetching all rates" })
  }
}

export const getRatesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params
    const rateDate = new Date(date)
    const rates = await getRates(rateDate)
    res.json(rates)
  } catch (error) {
    res.status(500).json({ error: "Error fetching rates by date" })
  }
}