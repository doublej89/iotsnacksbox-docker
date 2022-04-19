"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const SubscriptionSchema = new mongoose_1.default.Schema({
    plan: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
    },
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    features: mongoose_1.default.Schema.Types.Mixed,
    price: {
        type: Number
    },
    currency: {
        type: String,
        default: "USD"
    },
    paymentFrequency: {
        type: String,
    },
    transactions: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Transaction"
        }],
    status: {
        type: String,
        default: "Pending"
    },
    startAt: Date,
    endAt: Date
});
SubscriptionSchema.plugin(resourceuser_1.default);
exports.Subscription = mongoose_1.default.model("Subscription", SubscriptionSchema);
//# sourceMappingURL=Subscription.js.map