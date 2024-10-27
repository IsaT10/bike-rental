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
exports.googleLoginDataInDB = exports.userLogin = exports.userSignUp = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../User/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const userSignUp = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield user_model_1.User.hashPassword(payload.password);
    payload.password = hashPassword;
    const result = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { image: file === null || file === void 0 ? void 0 : file.path }));
    const jwtPayload = {
        id: result === null || result === void 0 ? void 0 : result._id,
        role: result === null || result === void 0 ? void 0 : result.role,
    };
    // create access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires);
    return { accessToken };
});
exports.userSignUp = userSignUp;
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ email: payload.email }).select('+password -__v -updatedAt -createdAt ');
    // check is user exists
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    //check is password matched with hash password
    if (!isPasswordMatched) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password does not matched');
    }
    const jwtPayload = {
        id: isUserExists._id,
        role: isUserExists.role,
    };
    // create access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires);
    return { accessToken };
});
exports.userLogin = userLogin;
const googleLoginDataInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, image } = payload;
    if (!email)
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Google login failed');
    let user = yield user_model_1.User.findOne({ email });
    if (!user) {
        user = yield user_model_1.User.create({ email, name, image });
    }
    // Generate JWT
    const jwtPayload = { id: user._id, role: user.role };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.access_secret, config_1.default.access_expires);
    return { accessToken };
});
exports.googleLoginDataInDB = googleLoginDataInDB;
