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
exports.saveTransaction = exports.stripePayment = exports.getAllPayment = exports.payment = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const stripePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, payment_service_1.paymentWithStripe)(req.body);
    res.json({
        success: true,
        statusCode: 201,
        clientSecret: data,
    });
}));
exports.stripePayment = stripePayment;
// const stripePaymentSession = catchAsync(async (req: Request, res: Response) => {
//   const data = await paymentWithStripeSession(req.body);
//   res.json({
//     success: true,
//     statusCode: 201,
//     data,
//   });
// });
// export const stripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers['stripe-signature'];
//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       sig as string,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object as Stripe.Checkout.Session;
//       // Extract transaction details
//       // const transactionId = session.payment_intent;
//       // const amount = session.amount_total;
//       // const bikeId = session.metadata?.bikeId;
//       // const userId = session.metadata?.userId;
//       // Save these details to your database
//       // Example:
//       console.log(session);
//       console.log('Payment successfully processed and stored');
//     }
//     res.json({ received: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };
const saveTransaction = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    console.log(req.body);
    const data = yield (0, payment_service_1.saveTransactionIntoDB)(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Payment successful',
        data,
    });
}));
exports.saveTransaction = saveTransaction;
const payment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = yield (0, payment_service_1.paymentIntoDB)(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Payment successful',
        data,
    });
}));
exports.payment = payment;
const getAllPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = req.user;
    const { result, meta } = yield (0, payment_service_1.getPaymentFromDB)(req.query, id, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Payment history retrived successfully',
        meta,
        data: result,
    });
}));
exports.getAllPayment = getAllPayment;
