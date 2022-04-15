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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const error_handler_1 = __importDefault(require("../config/error-handler"));
const auth_1 = __importDefault(require("../services/auth"));
class Middlewares {
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.get("Authorization");
                if (!token)
                    throw new error_handler_1.default(401, "Unauthorized");
                try {
                    const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), config_1.default.AccessToken.secret, { algorithms: ["HS384"] });
                    req.user = decoded;
                    auth_1.default.setUser(decoded);
                    next();
                }
                catch (err) {
                    throw new error_handler_1.default(401, err);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    jsonSyntax(err, req, res, next) {
        if (err.name === "SyntaxError") {
            return res.status(400).json({ message: "The json data you're trying to send is invalid", desc: err.message });
        }
        next();
    }
}
exports.default = new Middlewares();
//# sourceMappingURL=index.js.map