"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const mongoose_1 = require("mongoose");
const RentalSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    startTime: { type: Date, default: new Date() },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
    isReviewed: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isRental: { type: Boolean, default: true },
    advancedPayment: { type: Number, default: 100 },
}, { versionKey: false });
exports.Rental = (0, mongoose_1.model)('Rental', RentalSchema);
