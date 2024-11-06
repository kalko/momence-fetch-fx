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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./database");
const rates_1 = __importDefault(require("./routes/rates"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
const port = 3010;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.get("/", (req, res) => {
    res.send("Hi");
    console.log("Hi");
});
app.use(rates_1.default);
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
