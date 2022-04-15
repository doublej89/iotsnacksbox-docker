"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Component_1 = require("./Component");
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const Action_1 = require("./Action");
const RegistrySchema = new mongoose_1.default.Schema({
    name: String,
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    component: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Component",
        required: true
    },
    token: String,
    actions: [Action_1.actionSchema],
    validity: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    skipVersioning: true
});
RegistrySchema.plugin(resourceuser_1.default);
RegistrySchema.pre("save", function save(next) {
    const registry = this;
    if (!this.isNew) {
        next();
        return;
    }
    Component_1.Component.findById(registry.component, (err, component) => {
        registry.actions = component.actions;
        next();
    });
});
exports.Registry = mongoose_1.default.model("Registry", RegistrySchema);
//# sourceMappingURL=Registry.js.map