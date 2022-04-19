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
const workspace_1 = __importDefault(require("../../services/workspace"));
const auth_1 = __importDefault(require("../../services/auth"));
const token_1 = __importDefault(require("../../services/token"));
const error_handler_1 = __importDefault(require("../../config/error-handler"));
class WorkspaceController {
    // validate (method: string): RequestHandler {
    //     let rules: Array<any> = [];
    //     switch (method) {
    //       case "getMembers": {
    //         rules = [ ];
    //          break;  
    //       }
    //     }
    //     return async (req: Request, res: Response, next: NextFunction) => {
    //           await Promise.all(rules.map(validation => validation.run(req)));
    //           const errors = validationResult(req);
    //           if (errors.isEmpty()) {
    //             return next();
    //           }
    //           res.status(422).json({ message: "Please fill all required fields.", errors: errors.array() });
    //         };
    //   }
    myWorkspaces(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ws = yield workspace_1.default.userWorkspaces(auth_1.default.id(), ["name", "slug"]);
                res.json(ws);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield workspace_1.default.getTransactions(auth_1.default.workspace());
                res.status(200).json({ transactions });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield workspace_1.default.getMembers(auth_1.default.workspace());
                res.status(200).json({ users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createWorkspace(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.workspace)
                    throw new error_handler_1.default(422, "Please Provided a workspace name!");
                else {
                    const workspace = yield workspace_1.default.getWorkspace(req.body.workspace);
                    if (workspace)
                        throw new error_handler_1.default(422, "This workspace name is already taken!");
                    const user = yield auth_1.default.getUser();
                    const newWorkspace = yield workspace_1.default.createWorkspace(req.body.workspace);
                    user.switchWorkspace(newWorkspace._id);
                    yield user.populate("workspace").execPopulate();
                    const accessToken = token_1.default.generateJwt(user);
                    const refreshToken = yield token_1.default.generateRefreshToken({
                        user: user._id,
                        device: req.get("user-agent"),
                        ip: req.ip,
                    });
                    res.status(200).json({ "access_token": accessToken, user: user.toJSON(), "refresh_token": refreshToken });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new WorkspaceController();
//# sourceMappingURL=workspace.js.map