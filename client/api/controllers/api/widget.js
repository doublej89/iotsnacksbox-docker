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
exports.destroyWidget = exports.storeWidget = exports.getWidgets = void 0;
const express_validator_1 = require("express-validator");
const Widget_1 = require("../../models/Widget");
const auth_1 = __importDefault(require("../../services/auth"));
exports.getWidgets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Widget_1.Widget.find({ workspace: auth_1.default.workspace() })
        .populate("registry")
        .exec((err, widgets) => {
        if (err)
            next(err);
        res.json(widgets);
    });
});
exports.storeWidget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("name", "Widget Should have a name").trim().notEmpty().run(req);
    if (!req.body._id) {
        yield express_validator_1.check("registry", "Widget Should have a registry Id").trim().notEmpty().run(req);
    }
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    let widget;
    if (req.body._id) {
        widget = yield Widget_1.Widget.findById(req.body._id);
        widget.overwrite(req.body);
    }
    else {
        widget = new Widget_1.Widget(req.body);
    }
    widget.workspace = auth_1.default.workspace();
    widget.save((error) => {
        if (error) {
            return next(error);
        }
        res.status(201).json(widget);
    });
});
exports.destroyWidget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("id", "please provide a widget Id").trim().notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    Widget_1.Widget.deleteOne({ _id: req.params.id }, (error) => {
        if (error)
            next(error);
        res.json({ success: true, message: "widget Delete successfully!!" });
    });
});
//# sourceMappingURL=widget.js.map