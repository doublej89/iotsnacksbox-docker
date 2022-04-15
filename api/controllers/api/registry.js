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
exports.deleteRegistry = exports.updateRegistry = exports.addRegistry = exports.getRegistries = exports.getTrigger = exports.postAction = void 0;
const express_validator_1 = require("express-validator");
const registry_1 = __importDefault(require("../../services/registry"));
const Component_1 = require("../../models/Component");
exports.postAction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("registry", "please provide a registry Id").trim().notEmpty().run(req);
    yield express_validator_1.check("action", "please provide a action name").trim().notEmpty().run(req);
    yield express_validator_1.check("value", "please provide a action value").trim().notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const action = {
        name: req.body.action,
        value: req.body.value
    };
    try {
        const registry = yield registry_1.default.fireAction(req.body.registry, [action]);
        res.status(200).json(registry);
    }
    catch (error) {
        next(error);
    }
});
exports.getTrigger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("registry", "please provide a registry Id").trim().notEmpty().run(req);
    yield express_validator_1.check("trigger", "please provide a trigger name").trim().notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    try {
        const triggers = yield registry_1.default.getTrigger(req.query.registry, req.query.trigger);
        res.status(200).json(triggers);
    }
    catch (error) {
        next(error);
    }
});
exports.getRegistries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registries = yield registry_1.default.getWorkspaceRegistries();
        return res.status(200).json({ registries });
    }
    catch (error) {
        return next(error);
    }
});
exports.addRegistry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const component = yield Component_1.Component.findById(req.body.component_id);
    try {
        const registry = yield registry_1.default.addRegistry(component, null, req.body.name);
        return res.status(200).json({ component, registry });
    }
    catch (error) {
        next(error);
    }
});
exports.updateRegistry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("name", "please provide a registry name").trim().notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    try {
        const registry = yield registry_1.default.updateRegistry(req.params.id, req.body.name);
        yield registry.populate("component").execPopulate();
        return res.status(200).json({ registry });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRegistry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield registry_1.default.deleteRegistry(req.params.id);
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=registry.js.map