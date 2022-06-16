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
const Workspace_1 = require("../models/Workspace");
const lodash_1 = require("lodash");
const Transaction_1 = require("../models/Transaction");
class WorkspaceService {
    createWorkspace(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = lodash_1.kebabCase(name);
            try {
                const ws = new Workspace_1.Workspace({ name, slug });
                if (yield ws.save()) {
                    return ws;
                }
            }
            catch (error) {
                throw new Error("Can\'n create Workspace.");
            }
        });
    }
    getWorkspace(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = lodash_1.kebabCase(name);
            return yield Workspace_1.Workspace.findOne({ slug });
        });
    }
    getWorkspaceById(wsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Workspace_1.Workspace.findOne({ _id: wsId });
        });
    }
    getMembers(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const ws = yield Workspace_1.Workspace.findById(workspace).populate("users.user");
            return ws;
        });
    }
    getTransactions(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const ws = yield Workspace_1.Workspace.findById(workspace);
            return yield Transaction_1.Transaction.find({ workspace: ws._id });
        });
    }
    addMember(name, userId, role = "member") {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = lodash_1.kebabCase(name);
            const ws = yield Workspace_1.Workspace.updateOne({ slug }, { $push: { users: { user: userId, role } } });
            return ws;
        });
    }
    deleteMember(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = lodash_1.kebabCase(name);
            const ws = yield Workspace_1.Workspace.updateOne({ slug }, { $pull: { users: { user: userId } } });
            return ws;
        });
    }
    deleteMemberByWorkspaceId(wsId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ws = yield Workspace_1.Workspace.updateOne({ _id: wsId }, { $pull: { users: { user: userId } } });
            return ws;
        });
    }
    userWorkspaces(userId, select = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Workspace_1.Workspace.find({ "users.user": userId }, select);
        });
    }
    switchWorkspace(user, workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const ws = await Workspace.findById(workspace);
                const ws = yield this.getWorkspace(workspace);
                if (this.isUserInWorkspace(ws, user._id)) {
                    user.switchWorkspace(ws._id);
                }
                return ws;
            }
            catch (error) {
                throw new Error("Can not change workspace");
            }
        });
    }
    getAllWorkspaces() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const ws = await Workspace.findById(workspace);
                return Workspace_1.Workspace.find({}).lean().populate("users.user").cursor();
            }
            catch (error) {
                throw new Error("Can not fetch all workspaces");
            }
        });
    }
    isUserInWorkspace(workspace, user) {
        const index = workspace.users.findIndex((u) => u.user.toString() === user.toString());
        return index !== -1;
    }
}
exports.default = new WorkspaceService();
//# sourceMappingURL=workspace.js.map