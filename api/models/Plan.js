"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PlanSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
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
});
exports.Plan = mongoose_1.default.model("Plan", PlanSchema);
//# sourceMappingURL=Plan.js.map