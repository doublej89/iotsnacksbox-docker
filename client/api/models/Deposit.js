"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const DepositSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String
    },
    currency: {
        type: String,
        default: "USD"
    },
    transaction: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Transaction",
    },
});
DepositSchema.plugin(resourceuser_1.default);
exports.Deposit = mongoose_1.default.model("Deposit", DepositSchema);
//# sourceMappingURL=Deposit.js.map