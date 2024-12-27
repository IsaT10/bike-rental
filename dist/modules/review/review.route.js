"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// Create a new review
router.post('/:bikeId', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(review_validation_1.createReviewValidationSchema), review_controller_1.createReview);
// Get a review by ID
router.get('/:reviewId', review_controller_1.getReviewById);
// Get all reviews
router.get('/', (0, auth_1.auth)('admin', 'user'), review_controller_1.getAllReview);
// Update a review by ID
router.patch('/:reviewId', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(review_validation_1.updateReviewValidationSchema), review_controller_1.updateReview);
// Delete a review by ID
router.delete('/:reviewId', (0, auth_1.auth)('admin', 'user'), review_controller_1.deleteReview);
exports.default = router;
