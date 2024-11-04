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
const express_1 = __importDefault(require("express"));
const databse_1 = require("./databse");
const rates_1 = require("./routes/rates");
const app = (0, express_1.default)();
const port = 3010;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hi");
    console.log("Hi");
});
app.get("/update/latest", rates_1.updateLatestRates);
app.get("/update/:date", rates_1.updateRatesByDate);
app.get("/rates", rates_1.getAllRates);
app.get("/rates/:date", rates_1.getRatesByDate);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
    try {
        yield (0, databse_1.connectMongoDb)();
    }
    catch (err) {
        console.error("Error: ", err);
    }
}));
