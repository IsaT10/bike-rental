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
exports.deleteBikeFromDB = exports.updateBikeIntoDB = exports.getAllBikeFromDB = exports.createBikeIntoDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const bike_model_1 = require("./bike.model");
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.create(payload);
    return result;
});
exports.createBikeIntoDB = createBikeIntoDB;
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.find();
    return result;
});
exports.getAllBikeFromDB = getAllBikeFromDB;
const updateBikeIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    //checked is updated id is exists
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'No data found');
    }
    return result;
});
exports.updateBikeIntoDB = updateBikeIntoDB;
const deleteBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndDelete(id);
    return result;
});
exports.deleteBikeFromDB = deleteBikeFromDB;
