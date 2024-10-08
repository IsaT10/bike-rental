"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleDuplicateError = (err) => {
    const values = Object.values(err.keyValue);
    const message = `'${values.join(' ')}' is already exists. Use another value!`;
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handleDuplicateError;
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   TErrorSource,
//   TGenericErrorResponse,
// } from '../middleware/globalErrorHandler';
// // Use Regex
// const handleDuplicate = (err: any): TGenericErrorResponse => {
//   const match = err.message.match(/"([^"]*)"/);
//   const extractedMsg = match && match[1];
//   const errorMessages: TErrorSource = [
//     {
//       path: '',
//       message: `${extractedMsg} already exists. Use another value!`,
//     },
//   ];
//   return {
//     statusCode: 400,
//     message: 'Duplicate Entry',
//     errorMessages,
//   };
// };
// export default handleDuplicate;
