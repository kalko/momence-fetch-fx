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
exports.parseCNBData = exports.getRates = exports.fetchRatesByDate = exports.fetchLatestRates = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const currencyRate_1 = require("../model/currencyRate");
const BASE_URL = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";
const fetchLatestRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(BASE_URL);
    console.log("Fetching rates from, ", BASE_URL);
    const { forDate, rates } = (0, exports.parseCNBData)(response.data);
    // update data - will keep only current / actual data
    yield currencyRate_1.CurrencyRate.deleteMany({ forDate });
    yield currencyRate_1.CurrencyRate.insertMany(rates);
    return rates;
});
exports.fetchLatestRates = fetchLatestRates;
const fetchRatesByDate = (dateString) => __awaiter(void 0, void 0, void 0, function* () {
    const cnbApiLikeDateString = (0, moment_1.default)(dateString).format("DD.MM.YYYY");
    const url = `${BASE_URL}?date=${cnbApiLikeDateString}`;
    const response = yield axios_1.default.get(url);
    console.log("Fetching rates from, ", url);
    const { forDate, rates } = (0, exports.parseCNBData)(response.data);
    // update data - will keep only current / actual data
    yield currencyRate_1.CurrencyRate.deleteMany({ forDate });
    yield currencyRate_1.CurrencyRate.insertMany(rates);
    return rates;
});
exports.fetchRatesByDate = fetchRatesByDate;
const getRates = (forDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield currencyRate_1.CurrencyRate.find(forDate ? { forDate } : {}).select("-_id -__v");
});
exports.getRates = getRates;
const parseCNBData = (data) => {
    const dataRows = data
        .split("\n")
        .filter((row) => row.trim() !== "")
        .slice(2);
    // extract published date
    const forDateStr = data.split("\n")[0].split(" ").slice(0, -1).join(" ");
    // convert to date
    const forDate = moment_1.default.utc(forDateStr, "DD MMM YYYY").toDate();
    const rates = dataRows.map((row) => {
        const [country, currency, amount, code, rate] = row.split("|");
        return {
            country,
            currency,
            amount: parseFloat(amount),
            code,
            rate: parseFloat(rate),
            forDate,
            fetchDatetime: new Date(),
        };
    });
    return { forDate, rates };
};
exports.parseCNBData = parseCNBData;
