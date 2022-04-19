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
Object.defineProperty(exports, "__esModule", { value: true });
const Plan_1 = require("../models/Plan");
class PlanService {
    createPlan(title, description, features, price, currency, paymentFrequency) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = new Plan_1.Plan({
                title,
                description,
                features,
                price,
                currency,
                paymentFrequency,
            });
            return yield plan.save();
        });
    }
    getPlan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Plan_1.Plan.findById(id);
        });
    }
    getPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Plan_1.Plan.find({});
        });
    }
}
exports.default = new PlanService();
//# sourceMappingURL=plan.js.map