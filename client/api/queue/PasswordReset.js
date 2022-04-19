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
const mailer_1 = __importDefault(require("../mailer/mailer"));
const token_1 = __importDefault(require("../services/token"));
class PasswordReset {
    heandle(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const reciver = {
                name: eventData.fullName,
                email: eventData.email
            };
            const templateData = {
                name: eventData.fullName,
                token: token_1.default.getPasswordToken(eventData)
            };
            yield mailer_1.default.mailByTemplate("passwordReset", templateData, reciver, "Varify your email.");
        });
    }
}
exports.default = new PasswordReset;
//# sourceMappingURL=PasswordReset.js.map