"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    url: process.env.DATABASE_URL,
    salt_round: process.env.SALT_ROUNDS,
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
    stripe_key: process.env.STRIPE_KEY,
};
