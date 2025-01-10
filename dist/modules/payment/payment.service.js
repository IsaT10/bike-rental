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
exports.saveTransactionIntoDB = exports.paymentWithStripe = exports.getPaymentFromDB = exports.paymentIntoDB = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const payment_model_1 = require("./payment.model");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(config_1.default.stripe_key);
const paymentWithStripe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = payload;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: Number(amount || 1 * 100),
        currency: 'usd',
        payment_method_types: ['card'],
    });
    return paymentIntent.client_secret;
});
exports.paymentWithStripe = paymentWithStripe;
// const paymentWithStripeSession = async (payload: { amount: number }) => {
//   const { description, amount } = payload;
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: description,
//           },
//           unit_amount: amount * 100, // Amount in cents
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${process.env.CLIENT_URL}/booking-complete`,
//     cancel_url: `${process.env.CLIENT_URL}/cancel`,
//   });
//   console.log(session);
//   return session.url;
// };
const paymentIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.create(Object.assign(Object.assign({}, payload), { user: userId }));
    return result;
});
exports.paymentIntoDB = paymentIntoDB;
const saveTransactionIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.create(Object.assign(Object.assign({}, payload), { user: userId }));
    return result;
});
exports.saveTransactionIntoDB = saveTransactionIntoDB;
const getPaymentFromDB = (query, id, role) => __awaiter(void 0, void 0, void 0, function* () {
    let queryObj;
    if (role === 'admin') {
        queryObj = {};
    }
    else {
        queryObj = { user: id };
    }
    const paymentQuery = new QueryBuilder_1.default(payment_model_1.Payment.find(queryObj).populate({
        path: 'user',
        select: 'name email',
    }), query)
        // .search()
        .fields()
        .sort()
        .filter();
    const result = yield paymentQuery.queryModel;
    const meta = yield paymentQuery.countTotal();
    return { meta, result };
});
exports.getPaymentFromDB = getPaymentFromDB;
