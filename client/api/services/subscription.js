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
const Subscription_1 = require("../models/Subscription");
const addMonths_1 = __importDefault(require("date-fns/addMonths"));
class SubscriptionService {
    createSubscription(planId, workspaceId, price, features, currency, paymentFrequency, status = "") {
        let subscription;
        if (status) {
            if (paymentFrequency === "Fixed") {
                subscription = new Subscription_1.Subscription({
                    plan: planId,
                    workspace: workspaceId,
                    features,
                    price,
                    currency,
                    status,
                    startAt: Date.now()
                });
            }
            else {
                subscription = new Subscription_1.Subscription({
                    plan: planId,
                    workspace: workspaceId,
                    features,
                    price,
                    currency,
                    status,
                    startAt: Date.now(),
                    endAt: addMonths_1.default(new Date(), 1)
                    // endAt: new Date(Date.now() + 1000 * 180)
                });
            }
        }
        return subscription;
    }
    getSubscriptionsByWorkspace(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Subscription_1.Subscription.find({ workspace });
        });
    }
}
exports.default = new SubscriptionService();
//# sourceMappingURL=subscription.js.map