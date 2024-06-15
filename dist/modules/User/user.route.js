"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get('/me', (0, auth_1.auth)('admin', 'user'), user_controller_1.getProfile);
router.put('/me', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(user_validation_1.updateUserValidationSchema), user_controller_1.updateProfile);
exports.default = router;
