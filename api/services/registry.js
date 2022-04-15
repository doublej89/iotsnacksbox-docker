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
const Registry_1 = require("./../models/Registry");
const error_handler_1 = __importDefault(require("../config/error-handler"));
const Trigger_1 = require("../models/Trigger");
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const Widget_1 = require("../models/Widget");
const auth_1 = __importDefault(require("./auth"));
class RegistryService {
    fireAction(id, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            let registry;
            if (typeof id === "string") {
                registry = yield Registry_1.Registry.findById(id);
            }
            else {
                registry = id;
            }
            if (!registry) {
                throw new error_handler_1.default(401, "Registry not Found!");
            }
            registry.actions.forEach(action => {
                const i = actions.findIndex((ia) => ia.name === action.name);
                if (i !== -1) {
                    action.value = actions[i].value;
                }
            });
            registry.markModified("actions");
            yield registry.save();
            return registry.toJSON();
        });
    }
    getTrigger(registryId, trigger) {
        return __awaiter(this, void 0, void 0, function* () {
            const registry = mongoose_1.default.Types.ObjectId(registryId);
            const triggers = yield Trigger_1.Trigger.find({ registry: registry, name: trigger }).sort({ createdAt: "desc" });
            return triggers;
        });
    }
    postTrigger(registryId, triggerName, triggerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const registry = mongoose_1.default.Types.ObjectId(registryId);
            const trigger = new Trigger_1.Trigger({
                name: triggerName,
                registry: registry,
                data: triggerData,
            });
            yield trigger.save();
            return trigger;
        });
    }
    getRegistryByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return Registry_1.Registry.find({ creator: user, }).populate("component");
        });
    }
    getWorkspaceRegistries(workspace = null) {
        return __awaiter(this, void 0, void 0, function* () {
            workspace = workspace || auth_1.default.workspace();
            return Registry_1.Registry.find({ workspace: workspace, }).populate("component");
        });
    }
    addRegistry(component, workspace = null, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield crypto_1.default.randomBytes(32).toString("hex");
            workspace = workspace || auth_1.default.workspace();
            const registry = new Registry_1.Registry({
                name: name,
                workspace: workspace,
                component: component,
                token: token
            });
            return yield registry.save();
        });
    }
    updateRegistry(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return Registry_1.Registry.findByIdAndUpdate(id, { name: name }, { new: true });
        });
    }
    deleteRegistry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Widget_1.Widget.deleteMany({ registry: id });
            yield Registry_1.Registry.deleteOne({ _id: id });
            return Promise.resolve(true);
        });
    }
}
exports.default = new RegistryService();
//# sourceMappingURL=registry.js.map