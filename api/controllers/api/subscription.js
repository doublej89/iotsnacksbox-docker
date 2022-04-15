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
const express_validator_1 = require("express-validator");
const Workspace_1 = require("../../models/Workspace");
const subscription_1 = __importDefault(require("../../services/subscription"));
const plan_1 = __importDefault(require("../../services/plan"));
const auth_1 = __importDefault(require("../../services/auth"));
const Transaction_1 = require("../../models/Transaction");
const uuid_1 = require("uuid");
class SubscriptionController {
    createSubscription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("planId", "please provide a plan").trim().notEmpty().run(req);
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors);
            }
            const { planId } = req.body;
            try {
                const plan = yield plan_1.default.getPlan(planId);
                if (!plan) {
                    return res.status(401).json({ message: "The plan you're trying to activate doesn't exist!" });
                }
                const workspace = yield Workspace_1.Workspace.findById(auth_1.default.workspace());
                if (workspace.currentBalance < plan.price) {
                    return res.status(401).json({ message: "Your workspace balance is not sufficient to activate this plan!" });
                }
                const subscription = subscription_1.default.createSubscription(plan._id, workspace._id, plan.price, plan.features, plan.currency, plan.paymentFrequency, "active");
                workspace.currentBalance = workspace.currentBalance - plan.price;
                if (plan.features.requestPerMonth) {
                    workspace.features.requestPerMonth = workspace.features.requestPerMonth + Number(plan.features.requestPerMonth);
                }
                if (plan.features.storage) {
                    workspace.features.storage = workspace.features.storage + Number(plan.features.storage);
                }
                const transaction = new Transaction_1.Transaction({
                    amount: plan.price,
                    currency: plan.currency,
                    status: "Complete",
                    invoice: uuid_1.v4(),
                    action: "activate plan"
                });
                transaction.workspace = workspace._id;
                transaction.workspaceBalance = workspace.currentBalance;
                yield workspace.save();
                yield transaction.save();
                subscription.transactions.push(transaction._id);
                yield subscription.save();
                res.status(200).json({ message: "Subscription activated", subscription });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSubscriptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield subscription_1.default.getSubscriptionsByWorkspace(auth_1.default.workspace());
                res.status(200).json({ subscriptions });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SubscriptionController();
//# sourceMappingURL=subscription.js.map