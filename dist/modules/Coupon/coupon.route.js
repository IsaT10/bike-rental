"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const coupon_controller_1 = require("./coupon.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const coupon_validation_1 = require("./coupon.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)('admin'), (0, validateRequest_1.default)(coupon_validation_1.createCouponValidationSchema), coupon_controller_1.createCoupon);
router.get('/', coupon_controller_1.getAllCoupons);
router.get('/:code', coupon_controller_1.getSingleCoupon);
router.put('/:id', (0, auth_1.auth)('admin'), (0, validateRequest_1.default)(coupon_validation_1.updateCouponValidationSchema), coupon_controller_1.updateCoupon);
router.delete('/:id', (0, auth_1.auth)('admin'), coupon_controller_1.deleteCoupon);
exports.default = router;
