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
exports.RequestLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RequestLogSchema = new Schema({
    method: String,
    length: Number,
    type: String,
    token: String,
    ip: String,
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: false,
    skipVersioning: true
});
RequestLogSchema.methods.createLog = function (req, token, type) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.create({
            method: req.method,
            ip: req.ip,
            length: (parseInt(req.headers["content-length"]) || 1) * 2 / 1000,
            type: type,
            token: token
        });
    });
};
exports.RequestLog = mongoose_1.default.model("RequestLog", RequestLogSchema);
//# sourceMappingURL=RequestLog.js.map