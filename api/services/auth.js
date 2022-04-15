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
const User_1 = require("../models/User");
class Auth {
    setUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof user === "string") {
                Auth.user = yield User_1.User.findById(user);
            }
            else {
                Auth.user = user;
            }
            return Auth.user;
        });
    }
    static auth() {
        return typeof Auth.user !== "undefined";
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof Auth.user.isNew === "undefined") {
                Auth.user = yield User_1.User.findById(this.id());
            }
            return Auth.user;
        });
    }
    id() {
        return Auth.auth() ? Auth.user._id : undefined;
    }
    workspace() {
        return Auth.auth() ? (Auth.user.workspace ? Auth.user.workspace : Auth.user.workspace._id) : undefined;
    }
    getWorkspaceUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser();
            if (!user.workspace._id) {
                yield user.populate("workspace").execPopulate();
            }
            return user.workspace.users.find((u) => u.user.equals(this.id()));
        });
    }
    isWorkspaceMember(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Auth.auth()) {
                return false;
            }
            if (this.workspace() != workspace) {
                return false;
            }
            const workspaceUser = yield this.getWorkspaceUser();
            return (workspaceUser.role == "member" || workspaceUser.role == "admin");
        });
    }
    isWorkspaceAdmin(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Auth.auth()) {
                return false;
            }
            if (!workspace.equals(this.workspace())) {
                return false;
            }
            const workspaceUser = yield this.getWorkspaceUser();
            return workspaceUser.role == "admin";
        });
    }
}
exports.default = new Auth;
//# sourceMappingURL=auth.js.map