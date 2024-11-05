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
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./database");
const rates_1 = require("./routes/rates");
const app = (0, express_1.default)();
const port = 3010;
app.use(express_1.default.json());
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Momence Fetch FX API",
            version: "1.0.0",
            description: "API to fetch and store FX rates from CNB",
        },
        servers: [
            {
                url: process.env.NODE_ENV === "production"
                    ? "https://momence-fetch-fx.up.railway.app"
                    : "http://localhost:3010",
            },
        ],
    },
    apis: ["./dist/app.js"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.get("/", (req, res) => {
    res.send("Hi");
    console.log("Hi");
});
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
app.post("/update/latest", rates_1.updateLatestRates);
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
app.post("/update/:date", rates_1.updateRatesByDate);
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
 *               - currency: "BRL"
 *                 rate: 3.992
 *                 amount: 1
 *                 country: "Brazil"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BGN"
 *                 rate: 12.928
 *                 amount: 1
 *                 country: "Bulgaria"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"

 */
app.get("/rates", rates_1.getAllRates);
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
 *               - currency: "BRL"
 *                 rate: 3.992
 *                 amount: 1
 *                 country: "Brazil"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 *               - currency: "BGN"
 *                 rate: 12.928
 *                 amount: 1
 *                 country: "Bulgaria"
 *                 forDate: "2024-11-04"
 *                 fetchDatetime: "2024-11-05T10:52:03.168Z"
 */
app.get("/rates/:date", rates_1.getRatesByDate);
// Conditionally start the server only when not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server is running on port ${port}`);
        try {
            yield (0, database_1.connectMongoDb)();
        }
        catch (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    }));
}
exports.default = app;
