"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
router.post('/signup', multer_config_1.multerUpload.single('image'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.createUserValidationSchema), auth_controller_1.signUp);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.lgoinUserValidationSchema), auth_controller_1.login);
router.post('/google-login', auth_controller_1.googleLogin);
exports.default = router;
