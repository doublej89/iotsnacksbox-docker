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
const Transaction_1 = require("../models/Transaction");
const Subscription_1 = require("../models/Subscription");
const uuid_1 = require("uuid");
const endOfDay_1 = __importDefault(require("date-fns/endOfDay"));
const startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
const addMonths_1 = __importDefault(require("date-fns/addMonths"));
function monthlySubscriptionCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptions = yield Subscription_1.Subscription.find({
            endAt: {
                $gte: startOfDay_1.default(new Date()),
                $lte: endOfDay_1.default(new Date())
            }
        })
            .populate("workspace")
            .populate("plan");
        for (const subscription of subscriptions) {
            if (subscription.status === "active") {
                if (subscription.workspace.currentBalance >= subscription.plan.price) {
                    subscription.workspace.currentBalance =
                        subscription.workspace.currentBalance - subscription.plan.price;
                    if (subscription.plan.features.requestPerMonth) {
                        subscription.workspace.features.requestPerMonth =
                            subscription.workspace.features.requestPerMonth +
                                Number(subscription.plan.features.requestPerMonth);
                    }
                    if (subscription.plan.features.storage) {
                        subscription.workspace.features.storage =
                            subscription.workspace.features.storage +
                                Number(subscription.plan.features.storage);
                    }
                    const transaction = new Transaction_1.Transaction({
                        amount: subscription.plan.price,
                        currency: subscription.plan.currency,
                        status: "Complete",
                        invoice: uuid_1.v4(),
                        action: "reactivate plan"
                    });
                    transaction.workspace = subscription.workspace._id;
                    transaction.workspaceBalance = subscription.workspace.currentBalance;
                    subscription.endAt = addMonths_1.default(new Date(), 1);
                    subscription.transactions.push(transaction._id);
                    yield transaction.save();
                    yield subscription.workspace.save();
                    yield subscription.save();
                }
                else {
                    subscription.status = "inactive";
                    subscription.endAt = null;
                    yield subscription.save();
                }
            }
        }
    });
}
exports.default = monthlySubscriptionCheck;
//# sourceMappingURL=monthly-subscription-check.js.map