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
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLog_1 = require("../models/RequestLog");
const Registry_1 = require("../models/Registry");
function onTick() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestsByToken = new Map();
        const requestLogs = yield RequestLog_1.RequestLog.find({
            createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60) }
        });
        requestLogs.forEach(request => {
            if (!requestsByToken.has(request.token)) {
                requestsByToken.set(request.token, [request]);
            }
            else {
                requestsByToken.get(request.token).push(request);
            }
        });
        for (const [token, requestList] of requestsByToken.entries()) {
            let totalLength = 0;
            requestList.forEach(request => {
                if (request.type === "trigger") {
                    totalLength += request.length;
                }
            });
            const registry = yield Registry_1.Registry.findOne({ token: token }).populate("workspace");
            if (!registry) {
                console.log(`The token: ${token} is not valid!`);
            }
            else {
                if (totalLength > 0 || requestList.length > 0) {
                    registry.workspace.storage = registry.workspace.storage + totalLength;
                    registry.workspace.request = registry.workspace.request + requestList.length;
                    const requestCap = registry.workspace.features.requestPerMonth;
                    const storageCap = registry.workspace.features.storage;
                    if (registry.workspace.storage >= storageCap || registry.workspace.request >= requestCap) {
                        registry.validity = false;
                    }
                    yield registry.workspace.save();
                    yield registry.save();
                }
            }
        }
    });
}
exports.default = onTick;
//# sourceMappingURL=hourly-workspace-capacity-check.js.map