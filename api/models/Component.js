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
exports.Component = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import {Action} from "../types/actionInterface";
const Registry_1 = require("./Registry");
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const Action_1 = require("./Action");
const ComponentTrigger_1 = require("./ComponentTrigger");
const { Schema } = mongoose_1.default;
// export interface ComponentTrigger {
//     id: string;
//     name: string;
//     value: object;
// }
const ComponentSchama = new Schema({
    name: {
        trim: true,
        type: String,
        required: true
    },
    description: String,
    avatar: String,
    status: {
        type: String,
        enum: ["active", "inactive", "pending", "testing"],
        validate: (v) => (["active", "inactive", "pending", "testing"].indexOf(v) !== -1),
        default: "active"
    },
    accessibility: {
        type: String,
        enum: ["public", "private", "custom"],
        validate: (v) => (["public", "private", "custom"].indexOf(v) !== -1),
        default: "public"
    },
    price: Number,
    actions: [Action_1.actionSchema],
    triggers: [ComponentTrigger_1.componentTriggerSchema],
    icon: String,
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: false
    },
}, {
    timestamps: true,
    skipVersioning: true
});
ComponentSchama.plugin(resourceuser_1.default);
ComponentSchama.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("actions")) {
            next();
            return;
        }
        try {
            const registries = yield Registry_1.Registry.find({ component: this._id });
            registries.forEach((registry) => __awaiter(this, void 0, void 0, function* () {
                registry.actions = this.get("actions");
                yield registry.save();
            }));
        }
        catch (error) {
            throw new Error("Can not save action to registry");
        }
        next();
    });
});
exports.Component = mongoose_1.default.model("Component", ComponentSchama);
//# sourceMappingURL=Component.js.map