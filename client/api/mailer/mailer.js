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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../util/logger"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
class Mailer {
    constructor() {
        this.driver = config_1.default.mailer.driver || "log";
        if (this.driver === "ses") {
            aws_sdk_1.default.config.update({
                accessKeyId: config_1.default.mailer.ses.accessKeyId,
                secretAccessKey: config_1.default.mailer.ses.secretAccessKey,
                region: config_1.default.mailer.ses.region
            });
        }
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.driver) {
                case "ses":
                    return yield this.sendMailBySES(options);
                default:
                    return this.sendMailIntoLog(options);
            }
        });
    }
    sendMailBySES(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailTo = typeof options.to.name !== "undefined" ? `${options.to.name} <${options.to.email}>` : `${options.to.email}`;
            // Create sendEmail params 
            const params = {
                Destination: {
                    ToAddresses: [mailTo]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: options.message
                        },
                        Text: {
                            Charset: "UTF-8",
                            Data: options.message
                        }
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: options.subject
                    }
                },
                Source: `${config_1.default.mailer.senderName} <${config_1.default.mailer.senderEmail}>`,
                ReplyToAddresses: [
                    config_1.default.mailer.reaplyTo,
                ],
            };
            // Create the promise and SES service object
            return yield new aws_sdk_1.default.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
        });
    }
    sendMailIntoLog(options) {
        logger_1.default.debug(options);
    }
    mail(to, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sendMail({ to, subject, message });
        });
    }
    mailHTML(to, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sendMail({ to, subject, message });
        });
    }
    loadTemplate(view, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ejs_1.default.renderFile(path_1.default.join(__dirname, "/../views/mails/", view + ".ejs"), data);
        });
    }
    mailByTemplate(view, data, to, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.loadTemplate(view, data);
            return yield this.mailHTML(to, subject, messages);
        });
    }
}
exports.default = new Mailer();
//# sourceMappingURL=mailer.js.map