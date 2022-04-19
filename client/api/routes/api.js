"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const component = __importStar(require("../controllers/api/component"));
const widget = __importStar(require("../controllers/api/widget"));
const workspace_1 = __importDefault(require("../controllers/api/workspace"));
const payment_1 = __importDefault(require("../controllers/api/payment"));
const subscription_1 = __importDefault(require("../controllers/api/subscription"));
const plan_1 = __importDefault(require("../controllers/api/plan"));
// API keys and Passport configuration
const registryController = __importStar(require("../controllers/api/registry"));
const snacksbox = __importStar(require("../controllers/snacksbox"));
const routes = express_1.Router();
routes.get("/components", component.getComponents);
routes.get("/components/self", component.getSelfComponents);
routes.post("/components", component.postComponent);
routes.put("/components/:id", component.putComponent);
routes.put("/components/:id/active", component.activeComponent);
routes.delete("/components/:id", component.deleteComponent);
routes.post("/components/:id/add-actions", component.addActions);
routes.post("/components/:id/add-triggets", component.addTriggers);
routes.get("/registries", registryController.getRegistries);
routes.post("/registries", registryController.addRegistry);
routes.put("/registries/:id", registryController.updateRegistry);
routes.delete("/registries/:id", registryController.deleteRegistry);
routes.post("/registries/action", registryController.postAction);
routes.get("/registries/trigger", registryController.getTrigger);
routes.get("/widgets", widget.getWidgets);
routes.post("/widgets", widget.storeWidget);
routes.delete("/widgets/:id", widget.destroyWidget);
routes.get("/workspace/my-workspaces", workspace_1.default.myWorkspaces);
routes.get("/workspace/members", workspace_1.default.getMembers);
routes.get("/workspace/transactions", workspace_1.default.getTransactions);
routes.post("/workspace", workspace_1.default.createWorkspace);
routes.post("/deposit", payment_1.default.deposit);
routes.post("/webhook/payment", payment_1.default.webhook);
routes.post("/subscription", subscription_1.default.createSubscription);
routes.get("/subscription", subscription_1.default.getSubscriptions);
routes.post("/plan", plan_1.default.createPlan);
routes.get("/plan", plan_1.default.getPlans);
routes.post("/snacksbox/verify", snacksbox.verifySnackBox);
module.exports = routes;
//# sourceMappingURL=api.js.map