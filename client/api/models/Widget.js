"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const WidgetSchema = new mongoose_1.default.Schema({
    name: String,
    title: String,
    registry: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Registry",
        required: true
    },
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    order: Number,
    widgetType: String,
    action: String,
    trigger: String,
    settings: mongoose_1.default.Schema.Types.Mixed,
    position: {
        width: Number,
        height: Number,
        top: Number,
        left: Number,
    },
}, {
    timestamps: true,
    skipVersioning: true
});
WidgetSchema.plugin(resourceuser_1.default);
exports.Widget = mongoose_1.default.model("Widget", WidgetSchema);
//# sourceMappingURL=Widget.js.map