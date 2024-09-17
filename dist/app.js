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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const noFoundRoute_1 = require("./error/noFoundRoute");
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./config"));
const stripe = new stripe_1.default(config_1.default.stripe_key);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5174',
        'http://localhost:5173',
        'https://xrides.netlify.app',
    ],
    credentials: true,
}));
// initial server start
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'testing...' });
});
// api routes
app.use('/api', routes_1.default);
app.post('/create-payment-intent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body; // Payment amount in smallest currency unit, e.g., cents for USD
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: parseInt(amount || 1 * 100), // Amount in cents
            currency: 'usd', // Specify the currency
            payment_method_types: ['card'],
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Payment method is not work properly' });
    }
}));
// not found route
app.all('*', noFoundRoute_1.notFoundRoute);
// handle error globally
app.use(globalErrorHandler_1.default);
exports.default = app;
