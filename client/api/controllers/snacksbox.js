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
exports.verifySnackBox = exports.postTrigger = exports.postActions = exports.getActions = exports.postAction = exports.getAction = void 0;
const Registry_1 = require("./../models/Registry");
const registry_1 = __importDefault(require("../services/registry"));
const RequestLog_1 = require("../models/RequestLog");
const express_validator_1 = require("express-validator");
const Plan_1 = require("../models/Plan");
const Workspace_1 = require("../models/Workspace");
const auth_1 = __importDefault(require("../services/auth"));
const Transaction_1 = require("../models/Transaction");
const uuid_1 = require("uuid");
const subscription_1 = __importDefault(require("../services/subscription"));
const Snacksbox_1 = require("../models/Snacksbox");
exports.getAction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let registry = null;
    const token = (req.headers["x-snacksbox-token"] || req.query.snacksboxtoken);
    if (!token) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    if (token) {
        registry = yield Registry_1.Registry.findOne({ token: token });
        if (!registry) {
            return res.status(401).json({ message: "Must provided a valid token" });
        }
        if (!registry.validity) {
            return res.status(401).json({ message: "You have reached your request or storage usage limit" });
        }
    }
    const actionName = req.params.action_name;
    const action = registry.actions.find((action) => action.name === actionName);
    const log = new RequestLog_1.RequestLog({
        method: req.method,
        ip: req.ip,
        length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
        type: "action",
        token: token
    });
    yield log.save();
    return res.status(200).json(action);
});
exports.postAction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let registry = null;
    const token = (req.headers["x-snacksbox-token"] || req.query.snacksboxtoken);
    if (!token) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    registry = yield Registry_1.Registry.findOne({ token: token });
    if (!registry) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    const action = {
        name: req.body.name,
        value: req.body.value
    };
    registry = yield registry_1.default.fireAction(registry, [action]);
    req.io.emit(`${registry._id}.${action.name}`, registry);
    const log = new RequestLog_1.RequestLog({
        method: req.method,
        ip: req.ip,
        length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
        type: "action",
        token: token
    });
    yield log.save();
    return res.status(200).json(registry);
});
exports.getActions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let registry = null;
    const token = (req.headers["x-snacksbox-token"] || req.query.snacksboxtoken);
    if (!token) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    if (token) {
        registry = yield Registry_1.Registry.findOne({ token: token });
        if (!registry) {
            return res.status(401).json({ message: "Must provided a valid token" });
        }
    }
    const log = new RequestLog_1.RequestLog({
        method: req.method,
        ip: req.ip,
        length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
        type: "action",
        token: token
    });
    yield log.save();
    return res.status(200).json(registry.actions);
});
exports.postActions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let registry = null;
    const token = (req.headers["x-snacksbox-token"] || req.query.snacksboxtoken);
    if (!token) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    registry = yield Registry_1.Registry.findOne({ token: token });
    if (!registry) {
        return res.status(401).json({ message: "Must provided a valid token" });
    }
    const actions = req.body.actions;
    registry = yield registry_1.default.fireAction(registry, actions);
    for (let i = 0; i < actions.length; i++) {
        req.io.emit(`${registry._id}.${actions[i].name}`, registry);
    }
    const log = new RequestLog_1.RequestLog({
        method: req.method,
        ip: req.ip,
        length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
        type: "action",
        token: token
    });
    yield log.save();
    return res.status(200).json(registry);
});
exports.postTrigger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let registry = null;
    const triggerName = req.params.trigger_name;
    const token = (req.headers["x-snacksbox-token"] || req.query.snacksboxtoken);
    if (!token) {
        res.status(401).json({ message: "Must provided a valid token" });
        return;
    }
    if (token) {
        registry = yield Registry_1.Registry.findOne({ token: token });
        if (!registry) {
            res.status(401).json({ message: "Must provided a valid token" });
            return;
        }
        if (!registry.validity) {
            res.status(401).json({ message: "You have reached your request or storage usage limit" });
            return;
        }
    }
    if (!req.body.data) {
        res.status(422).json({ message: "Must provided data" });
        return;
    }
    const trigger = yield registry_1.default.postTrigger(registry._id, triggerName, req.body.data);
    req.io.emit(`${registry._id}.${triggerName}`, trigger);
    const log = new RequestLog_1.RequestLog({
        method: req.method,
        ip: req.ip,
        length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
        type: "trigger",
        token: token
    });
    yield log.save();
    return res.status(200).json(trigger);
});
exports.verifySnackBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("productId", "please provide a product id").trim().notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const { productId } = req.body;
    try {
        const snacksbox = yield Snacksbox_1.SnacksBox.findOne({ productId: +productId });
        if (!snacksbox) {
            return res.status(401).json({ message: "Your product key is invalid!" });
        }
        snacksbox.isVerified = true;
        yield snacksbox.save();
        const plan = yield Plan_1.Plan.findOne({ title: "Snacksbox Plan" });
        if (!plan) {
            return res.status(401).json({ message: "The plan you're trying to activate doesn't exist!" });
        }
        const workspace = yield Workspace_1.Workspace.findById(auth_1.default.workspace());
        // if (workspace.currentBalance < plan.price) {
        //   return res.status(401).json({message: "Your workspace balance is not sufficient to activate this plan!"});
        // }
        const subscription = subscription_1.default.createSubscription(plan._id, workspace._id, plan.price, plan.features, plan.currency, plan.paymentFrequency, "active");
        // workspace.currentBalance = workspace.currentBalance - plan.price;
        if (plan.features.requestPerMonth) {
            workspace.features.requestPerMonth = workspace.features.requestPerMonth + Number(plan.features.requestPerMonth);
        }
        if (plan.features.storage) {
            workspace.features.storage = workspace.features.storage + Number(plan.features.storage);
        }
        const transaction = new Transaction_1.Transaction({
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
//# sourceMappingURL=snacksbox.js.map