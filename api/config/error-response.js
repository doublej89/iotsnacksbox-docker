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
const config_1 = __importDefault(require("../config/"));
const logger_1 = __importDefault(require("../util/logger"));
// const webhook_1 = require("@slack/webhook");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ErrorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const webhook = new webhook_1.IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;
    // Security header for content sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");
    logger_1.default.error(message);
    logger_1.default.error(String(err.stack));
    // yield webhook.send(message);
    // if (err.stack)
    //     yield webhook.send(String(err.stack));
    if (config_1.default.env === "development") {
        res.status(status).json({ status, message, stack: err.stack });
        return;
    }
    res.status(status).json({ status, message });
});
exports.default = ErrorMiddleware;
//# sourceMappingURL=error-response.js.map