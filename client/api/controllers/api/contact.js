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
const error_handler_1 = __importDefault(require("../../config/error-handler"));
const queue_1 = __importDefault(require("../../util/queue"));
class Concact {
    contactUs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                throw new error_handler_1.default(422, "Please Provided an email!");
            }
            if (!req.body.message) {
                throw new error_handler_1.default(422, "Please Provided message!");
            }
            const data = {
                name: `${req.body.firstName} ${req.body.lastName}`,
                email: req.body.email,
                message: req.body.message,
                phone: req.body.phone
            };
            queue_1.default.dispatch("Contact", data);
            res.status(200).json({ success: true, message: "Email is send." });
        });
    }
}
exports.default = new Concact();
//# sourceMappingURL=contact.js.map