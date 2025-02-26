"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../modules/User/user.route"));
const auth_route_1 = __importDefault(require("../modules/Auth/auth.route"));
const bike_route_1 = __importDefault(require("../modules/Bike/bike.route"));
const rental_route_1 = __importDefault(require("../modules/Rental/rental.route"));
const coupon_route_1 = __importDefault(require("../modules/Coupon/coupon.route"));
const review_route_1 = __importDefault(require("../modules/review/review.route"));
const payment_route_1 = __importDefault(require("../modules/payment/payment.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/users', route: user_route_1.default },
    { path: '/bikes', route: bike_route_1.default },
    { path: '/auth', route: auth_route_1.default },
    { path: '/rentals', route: rental_route_1.default },
    { path: '/payments', route: payment_route_1.default },
    { path: '/coupons', route: coupon_route_1.default },
    { path: '/reviews', route: review_route_1.default },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
