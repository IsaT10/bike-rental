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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileFromDB = exports.updateProfileIntoDB = void 0;
const user_model_1 = require("./user.model");
const getProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
exports.getProfileFromDB = getProfileFromDB;
const updateProfileIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        payload.password = yield user_model_1.User.hashPassword(payload.password);
    }
    //update profile
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-updatedAt -createdAt -__v');
    return result;
});
exports.updateProfileIntoDB = updateProfileIntoDB;
