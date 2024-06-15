"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handelCastError_1 = __importDefault(require("../error/handelCastError"));
const handleDuplicate_1 = __importDefault(require("../error/handleDuplicate"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = Object.assign({}, err);
    error.message = err.message;
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        error = (0, handleZodError_1.default)(error);
    }
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        error = (0, handleValidationError_1.default)(error);
    }
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        error = (0, handleDuplicate_1.default)(error);
    }
    if (err.name === 'CastError') {
        error = (0, handelCastError_1.default)(error);
    }
    const { statusCode, message, stack } = error;
    const response = {
        success: false,
        statusCode,
        message,
        stack,
    };
    // if (statusCode !== httpStatus.UNAUTHORIZED) {
    //   response.stack = stack;
    // }
    if (statusCode === http_status_1.default.NOT_FOUND) {
        response.data = [];
    }
    res.status(statusCode).json(response);
    // if (config.node_env === 'development') {
    //   res.status(statusCode).json({
    //     success: false,
    //     message: message,
    //     err,
    //     stack: stack || err.stack,
    //   });
    // }
    // if (config.node_env === 'production') {
    //   res.status(statusCode).json({
    //     success: false,
    //     message: message,
    //   });
    // }
};
exports.default = globalErrorHandler;
