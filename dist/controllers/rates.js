"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatesByDate = exports.getAllRates = exports.updateRatesByDate = exports.updateLatestRates = void 0;
const moment_1 = __importDefault(require("moment"));
const rates_1 = require("../helpers/rates");
const updateLatestRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rates = yield (0, rates_1.fetchLatestRates)();
        console.log("Latest rates updated successfully");
        res.status(200).json("Latest day rates updated successfully");
    }
    catch (error) {
        res.status(500).json({ error: "Error updating latest rates" });
    }
});
exports.updateLatestRates = updateLatestRates;
const updateRatesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    try {
        if (!(0, moment_1.default)(date, "YYYY-MM-DD", true).isValid()) {
            res.status(400).json({ error: "Invalid date format" });
        }
        const rates = yield (0, rates_1.fetchRatesByDate)(date);
        console.log(`Rates for ${date} were updated successfully`);
        res.status(200).json(`Rates for ${date} were updated successfully`);
    }
    catch (error) {
        res.status(500).json({ error: `Error updating rates for date ${date}` });
    }
});
exports.updateRatesByDate = updateRatesByDate;
const getAllRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rates = yield (0, rates_1.getRates)();
        console.log("Get all rates sucessful");
        res.json(rates);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching all rates" });
    }
});
exports.getAllRates = getAllRates;
const getRatesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    try {
        if (!(0, moment_1.default)(date, "YYYY-MM-DD", true).isValid()) {
            res.status(400).json({ error: "Invalid date format" });
        }
        const rateDate = new Date(date);
        const rates = yield (0, rates_1.getRates)(rateDate);
        console.log(`Get rates for ${date} sucessful`);
        res.json(rates);
    }
    catch (error) {
        res.status(500).json({ error: `Error fetching rates for date ${date}` });
    }
});
exports.getRatesByDate = getRatesByDate;
