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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatesByDate = exports.getAllRates = exports.updateRatesByDate = exports.updateLatestRates = void 0;
const rates_1 = require("../helpers/rates");
const updateLatestRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rates = yield (0, rates_1.fetchLatestRates)();
        res.status(200).json(rates);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating latest rates" });
    }
});
exports.updateLatestRates = updateLatestRates;
const updateRatesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.params;
        const rates = yield (0, rates_1.fetchRatesByDate)(date);
        res.status(200).json(rates);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating rates by date" });
    }
});
exports.updateRatesByDate = updateRatesByDate;
const getAllRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rates = yield (0, rates_1.getRates)();
        res.json(rates);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching all rates" });
    }
});
exports.getAllRates = getAllRates;
const getRatesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.params;
        const rateDate = new Date(date);
        const rates = yield (0, rates_1.getRates)(rateDate);
        res.json(rates);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching rates by date" });
    }
});
exports.getRatesByDate = getRatesByDate;
