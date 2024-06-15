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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true });
UserSchema.statics.hashPassword = function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield bcrypt_1.default.hash(plainPassword, Number(process.env.SALT_ROUNDS));
        return hashPassword;
    });
};
UserSchema.statics.isPasswordMatched = function (plainPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainPassword, hashPassword);
    });
};
UserSchema.statics.isValidUser = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findById(id);
        if (!user) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
        }
        return user;
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
