"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentTrigger = exports.componentTriggerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.componentTriggerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        requred: true
    },
    value: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true
    },
}, {
    timestamps: true,
    skipVersioning: true
});
exports.ComponentTrigger = mongoose_1.default.model("ComponentTrigger", exports.componentTriggerSchema);
//# sourceMappingURL=ComponentTrigger.js.map