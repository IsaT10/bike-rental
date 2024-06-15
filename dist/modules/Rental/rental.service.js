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
exports.getRentalFromDB = exports.updateRentalIntoDB = exports.createRentalIntoDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const bike_model_1 = require("../Bike/bike.model");
const user_model_1 = require("../User/user.model");
const rental_model_1 = require("./rental.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createRentalIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.findById(payload.bikeId);
    if (!bike) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found! Please select another bike.');
    }
    if (!bike.isAvailable) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'This bike is already busy with another tourist. Choose another bike!');
    }
    yield user_model_1.User.isValidUser(id);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updateBikeStatus = yield bike_model_1.Bike.findByIdAndUpdate(payload.bikeId, {
            isAvailable: false,
        }, { session });
        if (!updateBikeStatus) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Can not update bike status!');
        }
        const result = yield rental_model_1.Rental.create([Object.assign({ userId: id }, payload)], {
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Can not create rental. Please try again later!');
        }
    }
});
exports.createRentalIntoDB = createRentalIntoDB;
const updateRentalIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield rental_model_1.Rental.findById(id).populate('bikeId');
    if (!rental) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const startTime = rental === null || rental === void 0 ? void 0 : rental.startTime.getTime();
    const returnTime = new Date().getTime();
    const hours = (returnTime - startTime) / (1000 * 60 * 60);
    const totalCost = parseFloat((hours * (rental === null || rental === void 0 ? void 0 : rental.bikeId.pricePerHour)).toFixed(2));
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield bike_model_1.Bike.findByIdAndUpdate(rental.bikeId, { isAvailable: true }, { session });
        const result = yield rental_model_1.Rental.findByIdAndUpdate(id, {
            totalCost,
            isReturned: true,
            returnTime,
        }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        if (error) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Can not update rental. Please try again later!');
        }
    }
});
exports.updateRentalIntoDB = updateRentalIntoDB;
const getRentalFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.isValidUser(id);
    const result = yield rental_model_1.Rental.find({ userId: id });
    if (!result.length) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    return result;
});
exports.getRentalFromDB = getRentalFromDB;
