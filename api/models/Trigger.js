"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const triggerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        requred: true
    },
    data: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true
    },
    registry: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Registry",
        required: true
    }
}, {
    timestamps: true,
    skipVersioning: true
});
exports.Trigger = mongoose_1.default.model("Trigger", triggerSchema);
//# sourceMappingURL=Trigger.js.map