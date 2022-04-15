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
const auth_1 = __importDefault(require("../../services/auth"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Deposit_1 = require("../../models/Deposit");
const Transaction_1 = require("../../models/Transaction");
const Workspace_1 = require("../../models/Workspace");
class PaymentController {
    deposit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_1.default.getUser();
            const { amount, currency, address1, address2, city, state, postcode, country, phone } = req.body;
            const deposit = new Deposit_1.Deposit({ status: "Pending", amount, paymentMethod: "sslcommerz", currency, transaction: null });
            const depositBody = {
                name: user.fullName,
                email: user.email,
                amount,
                currency,
                address1,
                address2,
                city,
                state,
                postcode,
                country,
                phone,
                action: "deposit",
                invoice: deposit._id.toString()
            };
            console.log(`Deposit id/invoice: ${depositBody.invoice}`);
            try {
                const response = yield node_fetch_1.default("http://localhost:8080/get-session", {
                    method: "post",
                    body: JSON.stringify(depositBody),
                    headers: { "Content-Type": "application/json" },
                });
                const result = yield response.json();
                if (response.ok) {
                    yield deposit.save();
                    res.status(200).json(result);
                }
                else {
                    deposit.status = "Failed";
                    deposit.save();
                    res.status(404).json(result);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    webhook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { invoice, status } = req.body;
            const deposit = yield Deposit_1.Deposit.findById(invoice);
            if (status === "failure") {
                deposit.status = "Failed";
                deposit.save();
                return res.status(422).json({ message: "Payment failed" });
            }
            if (status === "canceled") {
                deposit.status = "Canceled";
                deposit.save();
                return res.status(422).json({ message: "Payment was canceled" });
            }
            const response = yield node_fetch_1.default(`http://localhost:8080/transaction/${invoice}?confirming=yes`);
            if (response.ok) {
                const result = yield response.json();
                if (result.transaction.status === "Complete" || result.transaction.status === "Processing") {
                    deposit.status = "Complete";
                    const transaction = new Transaction_1.Transaction({
                        amount: result.transaction.amount,
                        currency: result.transaction.currency,
                        status: "Complete",
                        invoice: result.transaction.invoice,
                        action: result.transaction.action,
                        paymentMethod: "SSL Commerz"
                    });
                    const workspace = yield Workspace_1.Workspace.findById(auth_1.default.workspace());
                    workspace.currentBalance = workspace.currentBalance + Number(transaction.amount);
                    transaction.workspace = auth_1.default.workspace();
                    transaction.workspaceBalance = workspace.currentBalance;
                    deposit.transaction = transaction._id;
                    yield workspace.save();
                    yield transaction.save();
                    yield deposit.save();
                    res.status(200).json({ message: "Payment completed" });
                }
            }
            else {
                res.status(404).json({ message: "Something went wrong" });
            }
        });
    }
}
exports.default = new PaymentController();
//# sourceMappingURL=payment.js.map