"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    review: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bike', required: true },
    rating: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
