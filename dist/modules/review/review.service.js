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
exports.deleteReviewFromDB = exports.updateReviewInDB = exports.getAllReviewFromDB = exports.getReviewByIdFromDB = exports.createReviewIntoDB = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const review_model_1 = require("./review.model");
const http_status_1 = __importDefault(require("http-status"));
const createReviewIntoDB = (userId, bikeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(Object.assign(Object.assign({}, payload), { userId, bikeId }));
    return result;
});
exports.createReviewIntoDB = createReviewIntoDB;
const getReviewByIdFromDB = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findById(reviewId)
        .populate('userId', 'name')
        .populate('bikeId', 'content category');
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Review not found!');
    }
    return result;
});
exports.getReviewByIdFromDB = getReviewByIdFromDB;
const getAllReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ userId: id });
    // .populate('userId', 'name')
    // .populate('bikeId', 'content category');
    return result;
});
exports.getAllReviewFromDB = getAllReviewFromDB;
const updateReviewInDB = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findByIdAndUpdate(reviewId, payload, {
        new: true,
    });
    if (!review) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Review not found!');
    }
    return review.save();
});
exports.updateReviewInDB = updateReviewInDB;
const deleteReviewFromDB = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndDelete(reviewId);
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Review not found!');
    }
    return result;
});
exports.deleteReviewFromDB = deleteReviewFromDB;
