"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnacksBox = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SnacksboxSchema = new mongoose_1.default.Schema({
    productId: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
exports.SnacksBox = mongoose_1.default.model("SnacksBox", SnacksboxSchema);
//# sourceMappingURL=Snacksbox.js.map