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
exports.getSingleBikeFromDB = exports.deleteBikeFromDB = exports.updateBikeIntoDB = exports.getAllBikeFromDB = exports.createBikeIntoDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const bike_model_1 = require("./bike.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createBikeIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Image is required');
    }
    const result = yield bike_model_1.Bike.create(Object.assign(Object.assign({}, payload), { image: file.path }));
    return result;
});
exports.createBikeIntoDB = createBikeIntoDB;
const getAllBikeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const BikeSearchableFields = ['brand', 'model'];
    const bikeQuery = new QueryBuilder_1.default(bike_model_1.Bike.find().populate({
        path: 'reviews',
        select: 'rating',
    }), query)
        .search(BikeSearchableFields)
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield bikeQuery.queryModel;
    const meta = yield bikeQuery.countTotal();
    return { result, meta };
});
exports.getAllBikeFromDB = getAllBikeFromDB;
const getSingleBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findById(id).populate({
        path: 'reviews',
        populate: { path: 'userId', select: 'name image' },
    });
    return result;
});
exports.getSingleBikeFromDB = getSingleBikeFromDB;
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
