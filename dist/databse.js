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
exports.connectMongoDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const mongoDbUrl = process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017";
const connectMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENV !== "test") {
            yield (0, mongoose_1.connect)(mongoDbUrl);
        }
        console.log("Connected to mongoDB");
    }
    catch (err) {
        console.error("Error", err);
    }
});
exports.connectMongoDb = connectMongoDb;
