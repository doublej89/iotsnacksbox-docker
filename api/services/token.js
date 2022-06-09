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
const crypto_1 = __importDefault(require("crypto"));
const Token_1 = require("../models/Token");
class TokenService {
    generateJwt(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            workspace: user.workspace ? user.workspace._id : "",
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.AccessToken.secret, {
            algorithm: "HS384",
            expiresIn: config_1.default.AccessToken.age
        });
        return token;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                user: payload.user,
                device: payload.device,
                ip: payload.ip
            }, update = {
                user: payload.user,
                device: payload.device,
                ip: payload.ip,
                token: this.randomTokenString(),
                expires: new Date(Date.now() + config_1.default.refreshToken.age * 1000),
                loginAt: new Date(Date.now())
            };
            // Find the document
            let tokenDocument = yield Token_1.Token.findOne(query);
            if (tokenDocument) {
                tokenDocument.overwrite(Object.assign({}, update));
            }
            else {
                tokenDocument = new Token_1.Token(Object.assign({}, update));
            }
            tokenDocument.save();
            const token = jsonwebtoken_1.default.sign({
                id: tokenDocument._id,
                token: tokenDocument.token
            }, config_1.default.refreshToken.secret, {
                algorithm: "HS512",
                expiresIn: config_1.default.refreshToken.age
            });
            return token;
        });
    }
    varifyRefreshToken(token, ip, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.default.refreshToken.secret, { algorithms: ["HS512"] });
                const tokenDoc = yield Token_1.Token.findOne({ _id: decoded.id }).exec();
                if (tokenDoc.isExpired) {
                    throw new Error("Invalid token");
                }
                if (tokenDoc.ip !== ip) {
                    throw new Error("Invalid token");
                }
                if (tokenDoc.device !== userAgent) {
                    throw new Error("Invalid token");
                }
                return tokenDoc.toJSON();
            }
            catch (err) {
                throw new Error("Invalid token");
            }
        });
    }
    randomTokenString(size = 40) {
        return crypto_1.default.randomBytes(size).toString("hex");
    }
    removeToken(user, ip, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_1.Token.updateOne({ ip: ip, device: userAgent, user: user._id }, { expires: new Date(Date.now()) });
        });
    }
    getVarifyEmailToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email
        }, config_1.default.varifyEmal.secret, {
            algorithm: "HS512",
            expiresIn: config_1.default.varifyEmal.age
        });
    }
    varifyEmailToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.default.varifyEmal.secret, { algorithms: ["HS512"] });
    }
    getPasswordToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email
        }, config_1.default.passeordReset.secret, {
            algorithm: "HS512",
            expiresIn: config_1.default.passeordReset.age
        });
    }
    varifyPasswordResetToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.default.passeordReset.secret, { algorithms: ["HS512"] });
    }
    genertaInvitationToken(payload) {
        return jsonwebtoken_1.default.sign(payload, config_1.default.varifyEmal.secret, {
            algorithm: "HS512",
            expiresIn: config_1.default.passeordReset.age
        });
    }
    varifyInvitationToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.default.varifyEmal.secret, { algorithms: ["HS512"] });
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token.js.map