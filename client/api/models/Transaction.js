"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// type addUserFuncton = (user: mongoose.Types.ObjectId, role: string) => void
const TransactionSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
    },
    invoice: {
        type: String,
    },
    action: String,
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        default: "No Payment"
    },
    workspaceBalance: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: "USD"
    },
});
exports.Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
//# sourceMappingURL=Transaction.js.map