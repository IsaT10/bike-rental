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
exports.deleteCouponFromDB = exports.updateCouponIntoDB = exports.getSingleCouponFromDB = exports.getAllCouponsFromDB = exports.createCouponIntoDB = void 0;
const coupon_model_1 = require("./coupon.model");
const appError_1 = __importDefault(require("../../error/appError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.create(payload);
    return result;
});
exports.createCouponIntoDB = createCouponIntoDB;
const getAllCouponsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const couponQuery = new QueryBuilder_1.default(coupon_model_1.Coupon.find(), query)
        .search([])
        .filter()
        .sort()
        .pagination()
        .fields();
    const result = yield couponQuery.queryModel;
    return result;
});
exports.getAllCouponsFromDB = getAllCouponsFromDB;
const getSingleCouponFromDB = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findOne({ couponCode: code });
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found');
    }
    return result;
});
exports.getSingleCouponFromDB = getSingleCouponFromDB;
const updateCouponIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found');
    }
    return result;
});
exports.updateCouponIntoDB = updateCouponIntoDB;
const deleteCouponFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found');
    }
    return result;
});
exports.deleteCouponFromDB = deleteCouponFromDB;
