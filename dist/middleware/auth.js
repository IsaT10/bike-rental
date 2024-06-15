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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route'
            // 'You are not logged in! please log in to get access.'
            );
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, config_1.default.access_secret);
        const { id, role } = decoded;
        const user = yield user_model_1.User.isValidUser(id);
        if (!requiredRoles.includes(role)) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        if (user.role !== role) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You do not have permission to perform this action');
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
