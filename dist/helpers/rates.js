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
exports.fetchLatestRates = void 0;
const axios_1 = __importDefault(require("axios"));
const currencyRate_1 = require("../model/currencyRate");
const BASE_URL = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";
const fetchLatestRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(BASE_URL);
    // extract publised date
    const forDateStr = response.data.split("\n")[0].split(" ")[0];
    // convert to date
    const forDate = new Date(forDateStr);
    const rates = parseCNBData(response.data, forDate);
    yield currencyRate_1.CurrencyRate.insertMany(rates);
    const storedRates = yield currencyRate_1.CurrencyRate.find({});
    console.log("Stored Rates for Date:", storedRates);
    return rates;
});
exports.fetchLatestRates = fetchLatestRates;
const parseCNBData = (data, forDate) => {
    const dataRows = data
        .split("\n")
        .filter((row) => row.trim() !== "")
        .slice(2);
    const rates = dataRows.map((row) => {
        const [country, currency, amount, code, rate] = row.split("|");
        return {
            country,
            currency,
            amount: parseFloat(amount),
            code,
            rate: parseFloat(rate),
            rateDate: forDate,
            fetchDatetime: new Date(),
        };
    });
    return rates;
};
