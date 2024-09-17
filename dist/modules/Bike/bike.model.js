"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const BikeSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
}, { versionKey: false });
exports.Bike = (0, mongoose_1.model)('Bike', BikeSchema);
