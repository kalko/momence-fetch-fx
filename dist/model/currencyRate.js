"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const currencyRateSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: Number, required: true },
    rate: { type: Number, required: true },
    forDate: { type: Date, required: true }, // date for which the rates are published
    fetchDatetime: { type: Date, required: true }, // date when data was fetched
});
exports.CurrencyRate = mongoose_1.default.model("CurrencyRate", currencyRateSchema);
