"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleExpiredTokenError = () => {
    return new appError_1.default(http_status_1.default.UNAUTHORIZED, 'Your token has expired!');
};
exports.default = handleExpiredTokenError;
