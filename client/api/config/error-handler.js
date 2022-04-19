"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = Exception;
//# sourceMappingURL=error-handler.js.map