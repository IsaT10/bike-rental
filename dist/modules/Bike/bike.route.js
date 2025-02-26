"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const bike_controller_1 = require("./bike.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)('admin'), multer_config_1.multerUpload.single('image'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(bike_validation_1.createBikeValidationSchema), bike_controller_1.createBike);
router.get('/', bike_controller_1.getAllBike);
router.get('/:id', bike_controller_1.getSingleBike);
router.put('/:id', (0, auth_1.auth)('admin'), (0, validateRequest_1.default)(bike_validation_1.updateBikeValidationSchema), bike_controller_1.updateBike);
router.delete('/:id', (0, auth_1.auth)('admin'), bike_controller_1.deleteBike);
exports.default = router;
