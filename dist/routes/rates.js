"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rates_1 = require("../controllers/rates");
const router = express_1.default.Router();
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
router.post("/update/latest", rates_1.updateLatestRates);
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
router.post("/update/:date", rates_1.updateRatesByDate);
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
router.get("/rates", rates_1.getAllRates);
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
router.get("/rates/:date", rates_1.getRatesByDate);
exports.default = router;
