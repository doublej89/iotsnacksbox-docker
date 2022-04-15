"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.actionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.actionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        requred: true
    },
    type: {
        type: String,
    },
    value: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true
    },
    values: [mongoose_1.default.Schema.Types.Mixed]
}, {
    timestamps: true,
    skipVersioning: true
});
exports.Action = mongoose_1.default.model("Action", exports.actionSchema);
//# sourceMappingURL=Action.js.map