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
exports.activeComponent = exports.addTriggers = exports.addActions = exports.deleteComponent = exports.putComponent = exports.postComponent = exports.getSelfComponents = exports.getComponents = void 0;
const Component_1 = require("../../models/Component");
const express_validator_1 = require("express-validator");
const Registry_1 = require("../../models/Registry");
const error_handler_1 = __importDefault(require("../../config/error-handler"));
const auth_1 = __importDefault(require("../../services/auth"));
exports.getComponents = (req, res, next) => {
    Component_1.Component
        .find({
        status: "active",
        $or: [{ workspace: auth_1.default.workspace() }, { accessibility: "public" }]
    })
        .exec((error, components) => {
        if (error) {
            return next(error);
        }
        return res.json(components);
    });
};
exports.getSelfComponents = (req, res, next) => {
    Component_1.Component
        .find({ workspace: auth_1.default.workspace() })
        .exec((error, components) => {
        if (error) {
            return next(error);
        }
        return res.json(components);
    });
};
exports.postComponent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("name", "Component require a name").not().isEmpty().trim().escape().run(req);
    if (req.body.actions) {
        yield express_validator_1.check("actions.*.name", "Please provide a action name").not().isEmpty().trim().run(req);
        yield express_validator_1.check("actions.*.type", "Please provide a valid action type").not().isEmpty().trim().run(req);
        yield express_validator_1.check("actions.*.values", "Please provide a action values").not().isEmpty().run(req);
    }
    if (req.body.triggers) {
        yield express_validator_1.check("triggers.*.name", "Please provide a trigger name").not().isEmpty().run(req);
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const component = new Component_1.Component({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        icon: req.body.icon,
        accessibility: req.body.accessibility,
        actions: req.body.actions || [],
        triggers: req.body.triggers || [],
        workspace: auth_1.default.workspace()
    });
    yield component.save();
    return res.status(200).json(component);
});
exports.putComponent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("name", "Component require a name").not().isEmpty().trim().escape().run(req);
    if (req.body.actions) {
        yield express_validator_1.check("actions.*.name", "Please provide a action name").not().isEmpty().trim().run(req);
        yield express_validator_1.check("actions.*.type", "Please provide a valid action type").not().isEmpty().trim().run(req);
        yield express_validator_1.check("actions.*.values", "Please provide a action values").not().isEmpty().run(req);
    }
    if (req.body.triggers) {
        yield express_validator_1.check("triggers.*.name", "Please provide a trigger name").not().isEmpty().run(req);
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    try {
        const component = yield Component_1.Component.findById(req.params.id);
        if (!(yield auth_1.default.isWorkspaceMember(component.workspace))) {
            return res.status(403).json({ message: "Permission Denied!" });
        }
        component.name = req.body.name;
        component.description = req.body.description;
        component.status = req.body.status;
        component.icon = req.body.icon;
        component.accessibility = req.body.accessibility;
        component.triggers = req.body.triggers || [];
        component.actions = req.body.actions || [];
        // component.markModified("actions");
        yield component.save();
        return res.status(200).json(component);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteComponent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const component = yield Component_1.Component.findById(req.params.id);
        if (!(yield auth_1.default.isWorkspaceMember(component.workspace))) {
            throw new error_handler_1.default(403, "permission denied");
        }
        yield Registry_1.Registry.deleteMany({ component: component._id });
        yield Component_1.Component.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.addActions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("actions.*.name", "Please provide a action name").not().isEmpty().trim().run(req);
    yield express_validator_1.check("actions.*.type", "Please provide a valid action type").not().isEmpty().trim().run(req);
    yield express_validator_1.check("actions.*.values", "Please provide a action values").not().isArray().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const component = yield Component_1.Component.findById(req.params.id);
    if (auth_1.default.workspace() !== component.workspace) {
        throw new error_handler_1.default(403, "permission denied");
    }
    component.actions = req.body.actions;
    component.markModified("actions");
    component.save((error) => {
        if (error) {
            return next(error);
        }
        return res.status(200).json(component);
    });
});
exports.addTriggers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("triggers.*.name", "Please provide a tregger name").not().isEmpty().trim().run(req);
    yield express_validator_1.check("triggers.*.value", "Please provide a valid trigger value").not().isEmpty().trim().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const component = yield Component_1.Component.findById(req.params.id);
    if (auth_1.default.workspace() !== component.workspace) {
        throw new error_handler_1.default(403, "permission denied");
    }
    component.triggers = req.body.triggers;
    component.markModified("triggers");
    component.save((error) => {
        if (error) {
            return next(error);
        }
        return res.status(200).json(component);
    });
});
exports.activeComponent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const component = yield Component_1.Component.findById(req.params.id);
    if (auth_1.default.workspace() !== component.workspace) {
        throw new error_handler_1.default(403, "permission denied");
    }
    component.status = status;
    component.save();
    res.status(200).json(component);
});
//# sourceMappingURL=component.js.map