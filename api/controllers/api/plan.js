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
const Plan_1 = require("../../models/Plan");
const plan_1 = __importDefault(require("../../services/plan"));
const subscription_1 = __importDefault(require("../../services/subscription"));
const auth_1 = __importDefault(require("../../services/auth"));
class PlanController {
    createPlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield express_validator_1.check("title", "please provide a plan name").trim().notEmpty().custom((value) => __awaiter(this, void 0, void 0, function* () {
                const plan = yield Plan_1.Plan.findOne({ title: value });
                if (plan) {
                    return Promise.reject("This plan already exists");
                }
            })).run(req);
            yield express_validator_1.check("paymentFrequency", "please provide payment frequency").trim().notEmpty().run(req);
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors);
            }
            const { title, description, price, currency, paymentFrequency, requestPerMonth, storage } = req.body;
            const features = {};
            if (!requestPerMonth && !storage) {
                return res.status(401).json({ message: "You must provide some feature for this plan" });
            }
            if (requestPerMonth)
                features.requestPerMonth = requestPerMonth;
            if (storage)
                features.storage = storage;
            try {
                const plan = yield plan_1.default.createPlan(title, description, features, price, currency, paymentFrequency);
                res.status(200).json({ message: "plan created", plan });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getPlans(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plans = yield plan_1.default.getPlans();
                const subscriptions = yield subscription_1.default.getSubscriptionsByWorkspace(auth_1.default.workspace());
                let plansWithStatus = [];
                plansWithStatus = plans.map(plan => {
                    const subscription = subscriptions.find(sub => sub.plan.toString() === plan._id.toString() && sub.status === "active");
                    let status = "free";
                    if (subscription)
                        status = subscription.status;
                    return {
                        _id: plan._id,
                        title: plan.title,
                        description: plan.description,
                        price: plan.price,
                        paymentFrequency: plan.paymentFrequency,
                        status: status,
                        requestPerMonth: plan.features.requestPerMonth ? plan.features.requestPerMonth : null,
                        storage: plan.features.storage ? plan.features.storage : null
                    };
                });
                res.status(200).json({ plans: plansWithStatus });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new PlanController();
//# sourceMappingURL=plan.js.map