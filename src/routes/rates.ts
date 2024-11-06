import express from "express"
import {
  getAllRates,
  getRatesByDate,
  updateLatestRates,
  updateRatesByDate,
} from "../controllers/rates"
const router = express.Router()

/**
 * @swagger
 * /update/latest:
 *   post:
 *     summary: Update latests FX rates
 *     responses:
 *       200:
 *         description: Rates updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Latest rates updated successfully"
 */
router.post("/update/latest", updateLatestRates)

/**
 * @swagger
 * /update/{date}:
 *   post:
 *     summary: Update FX rates for a specific date
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rates updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Rates for 2024-11-05 updated successfully"
 */
router.post("/update/:date", updateRatesByDate)

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: List all FX rates
 *     responses:
 *       200:
 *         description: A list of FX rates
 *         content:
 *           application/json:
 *             example:
 *               - currency: "AUD"
 *                 rate: 15.306
 *                 amount: 1
 *                 country: "Australia"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 */
router.get("/rates", getAllRates)

/**
 * @swagger
 * /rates/{date}:
 *   get:
 *     summary: List FX rates for a specific date
 *     parameters:
 *       - name: date
 *         in: path
 *         required: true
 *         description: Date in YYYY-MM-DD format
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of FX rates for the specified date
 *         content:
 *           application/json:
 *             example:
 *               - currency: "AUD"
 *                 rate: 15.306
 *                 amount: 1
 *                 country: "Australia"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 */
router.get("/rates/:date", getRatesByDate)

export default router
