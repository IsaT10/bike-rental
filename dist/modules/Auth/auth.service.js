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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../User/user.model");
const config_1 = __importDefault(require("../../config"));
const userSignUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //hash normal passwod
    const hashPassword = yield user_model_1.User.hashPassword(payload.password);
    payload.password = hashPassword;
    const result = yield user_model_1.User.create(payload);
    const _a = result.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
exports.userSignUp = userSignUp;
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ email: payload.email }).select('+password -__v -updatedAt -createdAt ');
    // check is user exists
    if (!isUserExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const _b = isUserExists.toObject(), { password } = _b, user = __rest(_b, ["password"]);
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
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_secret, {
        expiresIn: config_1.default.access_expires,
    });
    return { user, accessToken };
});
exports.userLogin = userLogin;
