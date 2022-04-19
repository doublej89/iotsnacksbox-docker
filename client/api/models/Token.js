"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TokenSchema = new Schema({
    token: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    device: String,
    ip: String,
    loginAt: { type: Date, default: Date.now },
    expires: Date,
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: false,
    skipVersioning: true
});
TokenSchema.virtual("isExpired").get(function () {
    return new Date(Date.now()) >= new Date(this.expires);
});
exports.Token = mongoose_1.default.model("Token", TokenSchema);
//# sourceMappingURL=Token.js.map