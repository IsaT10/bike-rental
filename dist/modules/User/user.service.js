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
exports.deleteUserFromDB = exports.roleChangeUser = exports.getAllUserFromDB = exports.getProfileFromDB = exports.updateProfileIntoDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_model_1 = require("./user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
exports.getProfileFromDB = getProfileFromDB;
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.deleteUserFromDB = deleteUserFromDB;
const roleChangeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, { role: 'admin' }, {
        new: true,
    });
    return result;
});
exports.roleChangeUser = roleChangeUser;
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userSearchableFields = ['name'];
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(userSearchableFields)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield userQuery.queryModel;
    const meta = yield userQuery.countTotal();
    return { result, meta };
});
exports.getAllUserFromDB = getAllUserFromDB;
const updateProfileIntoDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        payload.password = yield user_model_1.User.hashPassword(payload.password);
    }
    const userData = Object.assign(Object.assign({}, payload), { image: file === null || file === void 0 ? void 0 : file.path });
    //update profile
    const result = yield user_model_1.User.findByIdAndUpdate(id, userData, {
        new: true,
    }).select('-updatedAt -createdAt -__v');
    return result;
});
exports.updateProfileIntoDB = updateProfileIntoDB;
