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
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../services/user"));
const workspace_1 = __importDefault(require("../services/workspace"));
const error_handler_1 = __importDefault(require("../config/error-handler"));
const token_1 = __importDefault(require("../services/token"));
const queue_1 = __importDefault(require("../util/queue"));
const auth_1 = __importDefault(require("../services/auth"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../config"));
const mailer_1 = __importDefault(require("../mailer/mailer"));

class UserController {
    validate(method) {
        let rules = [];
        switch (method) {
            case "signup": {
                rules = [
                    express_validator_1.check("email", "Please provide a valid email address.").exists().isEmail().normalizeEmail().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield user_1.default.getUserByEmail(value);
                        if (user) {
                            return Promise.reject("E-mail already in use");
                        }
                    })),
                    express_validator_1.check("password", "Please provide a valid password.").exists().isLength({ min: 6 }),
                    express_validator_1.check("workspace", "Workspace is required.").exists().isAlphanumeric().isSlug().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const wp = yield workspace_1.default.getWorkspace(value);
                        if (wp) {
                            return Promise.reject("Workspace already in exist");
                        }
                    }))
                ];
                break;
            }
            case "login": {
                rules = [
                    express_validator_1.check("email", "Please provide a valid email address.").exists().isEmail().normalizeEmail(),
                    express_validator_1.check("password", "Please provide a valid password.").exists().isLength({ min: 6 }),
                ];
                break;
            }
            case "forgot": {
                rules = [
                    express_validator_1.check("email", "Please provide a valid email address.").exists().isEmail().normalizeEmail()
                ];
                break;
            }
            case "reset": {
                rules = [
                    express_validator_1.check("token", "Token missing").exists(),
                    express_validator_1.check("password", "Please provide a valid password.").exists().isLength({ min: 6 }),
                ];
                break;
            }
            case "workspaceInvitation": {
                rules = [
                    express_validator_1.check("email", "Please provide a valid email address.").exists().isEmail().normalizeEmail(),
                    express_validator_1.check("workspace", "Workspace is required.").exists().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const wp = yield workspace_1.default.getWorkspace(value);
                        if (!wp) {
                            return Promise.reject("Workspace not exist");
                        }
                    }))
                ];
                break;
            }
            case "getWorkspaceMembers": {
                rules = [
                    express_validator_1.check("workspace", "Workspace is required.").exists().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const wp = yield workspace_1.default.getWorkspace(value);
                        if (!wp) {
                            return Promise.reject("Workspace not exist");
                        }
                    }))
                ];
                break;
            }
            case "authEmailExists": {
                rules = [
                    express_validator_1.check("email", "Please provide a valid email address.").exists().isEmail().normalizeEmail().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield user_1.default.getUserByEmail(value);
                        if (user) {
                            return Promise.reject("E-mail already in use");
                        }
                    }))
                ];
                break;
            }
            case "authWorkspaceExists": {
                rules = [
                    express_validator_1.check("workspace", "Workspace is required.").exists().isAlphanumeric().isSlug().custom((value) => __awaiter(this, void 0, void 0, function* () {
                        const wp = yield workspace_1.default.getWorkspace(value);
                        if (wp) {
                            return Promise.reject("Workspace already in exist");
                        }
                    }))
                ];
                break;
            }
            case "varifyToken": {
                rules = [
                    express_validator_1.check("token", "Token missing").exists()
                ];
                break;
            }
        }
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(rules.map(validation => validation.run(req)));
            const errors = express_validator_1.validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            res.status(422).json({ message: "Please fill all required fields.", errors: errors.array() });
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workspaceName = req.body.workspace;
                delete req.body.workspace;
                const iuser = req.body;
                const user = yield user_1.default.create(iuser);
                auth_1.default.setUser(user);
                const workspace = yield workspace_1.default.createWorkspace(workspaceName);
                user.switchWorkspace(workspace._id);
                user.workspace = workspace.toJSON();
                const accessToken = token_1.default.generateJwt(user);
                const refreshToken = yield token_1.default.generateRefreshToken({
                    user: user._id,
                    workspace: user.workspace._id,
                    device: req.get("user-agent"),
                    ip: req.ip,
                });
                const reciver = {
                    name: user.fullName,
                    email: user.email
                };
                const demplateData = {
                    name: user.fullName,
                    token: token_1.default.getVarifyEmailToken(user)
                };
                mailer_1.default.mailByTemplate("registered", demplateData, reciver, "Verify your email.");
                yield user.populate("workspace").execPopulate();
                res.status(200).json({ "access_token": accessToken, user: user.toJSON(), "refresh_token": refreshToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    inviteFriend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = token_1.default.genertaInvitationToken({ email: req.body.email, redirect: "signup" });
                queue_1.default.dispatch("friendInvitation", { email: req.body.email, token: token });
                res.status(200).json({ message: "invitaion email send" });
            }
            catch (error) {
                res.status(500).json({ message: "invitaion email not send" });
            }
        });
    }
    workspaceInvitation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = token_1.default.genertaInvitationToken({ email: req.body.email, workspace: req.body.workspace, role: req.body.role });
                // queue_1.default.dispatch("WorkspaceInvitation", { email: req.body.email, token: token });
                const receiver = {
                    // name: eventData.fullName,
                    email: req.body.email
                };
                const templateData = {
                    // name: eventData.fullName,
                    token: token
                };
                mailer_1.default.mailByTemplate("workspaceInvitation", templateData, receiver, "You've been invited to a workspace.");
                res.status(200).json({ message: "invitaion email send" });
            }
            catch (error) {
                res.status(500).json({ message: "invitaion email not send" });
            }
        });
    }
    // async addUser(req: Request, res: Response, next: NextFunction): Promise<void>
    // {
    //   let updatedWs;
    //   try {
    //     if (req.body.workspace) {
    //       const user = await userService.getUserByEmail(req.body.email);
    //       if (user) {
    //         const wp = await workspaceService.getWorkspace(req.body.workspace);
    //         if (wp) {
    //           // wp.addUser(user._id, "member");
    //           updatedWs = await workspaceService.addMember(req.body.workspace, user._id, "member");
    //         }
    //       }
    //     }
    //     res.json({message: "user should be added", data: updatedWs});
    //   } catch (error) {
    //     res.status(500).json({message: "user not added"});
    //   }
    // }
    deleteUserFromWorkspace(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { workspace, userId } = req.body;
            const ws = yield workspace_1.default.deleteMember(workspace, userId);
            res.status(200).json({ ws });
        });
    }
    varifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            let redirect;
            try {
                const payload = token_1.default.varifyInvitationToken(token);
                redirect = payload.redirect;
                if (payload.workspace) {
                    const user = yield user_1.default.getUserByEmail(payload.email);
                    if (user) {
                        const wp = yield workspace_1.default.getWorkspace(payload.workspace);
                        if (wp) {
                            // wp.addUser(user._id, payload.role);
                            yield workspace_1.default.addMember(payload.workspace, user._id, payload.role);
                            user.switchWorkspace(wp._id);
                            redirect = "login";
                        }
                    }
                    else {
                        redirect = "signup";
                    }
                }
                res.status(200).json({ payload, redirect });
            }
            catch (error) {
                res.status(422).json({ message: "Invalide Token" });
            }
        });
    }
    emailVerify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            console.log(`recieved token: ${token}`);
            const payload = token_1.default.varifyEmailToken(token);
            const user = yield user_1.default.getUserById(payload.id);
            // user.assignPermissions([]);
            // user.assignRoles([]);
            user.emailVerifyAt = new Date(Date.now());
            yield user.save();
            yield user.populate("workspace").execPopulate();
            const accessToken = token_1.default.generateJwt(user);
            const refreshToken = yield token_1.default.generateRefreshToken({
                user: user._id,
                device: req.get("user-agent"),
                ip: req.ip,
            });
            // queue_1.default.dispatch("Wellcome", user);
            const reciver = {
                name: user.fullName,
                email: user.email
            };
            const demplateData = {
                name: user.fullName,
            };
            mailer_1.default.mailByTemplate("wellcome", demplateData, reciver, "Wellcome to Iocsnackbox");
            res.status(200).json({ "access_token": accessToken, user: user.toJSON(), "refresh_token": refreshToken });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.login(req.body.email, req.body.password);
                if (req.body.workspace) {
                    const workspace = yield workspace_1.default.getWorkspace(req.body.workspace);
                    user.switchWorkspace(workspace._id);
                    user.populate("workspace");
                }
                const accessToken = token_1.default.generateJwt(user);
                const refreshToken = yield token_1.default.generateRefreshToken({
                    user: user._id,
                    device: req.get("user-agent"),
                    ip: req.ip,
                });
                res.status(200).json({ "access_token": accessToken, user: user.toJSON(), "refresh_token": refreshToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    switchWorkspace(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_1.default.getUser();
                if (req.body.workspace) {
                    const workspace = yield workspace_1.default.switchWorkspace(user, req.body.workspace);
                    user.workspace = workspace;
                }
                const accessToken = token_1.default.generateJwt(user);
                const refreshToken = yield token_1.default.generateRefreshToken({
                    user: user._id,
                    device: req.get("user-agent"),
                    ip: req.ip,
                });
                res.status(200).json({ "access_token": accessToken, user: user.toJSON(), "refresh_token": refreshToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.body.refresh_token.replace("Bearer ", "");
            try {
                const tokenDoc = yield token_1.default.varifyRefreshToken(token, req.ip, req.get("user-agent"));
                if (tokenDoc) {
                    if ((parseInt(tokenDoc.expires) - Date.now()) <= 6 * 24 * 60 * 60) {
                        token = yield token_1.default.generateRefreshToken({
                            user: tokenDoc.user,
                            device: req.get("user-agent"),
                            ip: req.ip,
                        });
                    }
                    const user = yield (yield user_1.default.getUserById(tokenDoc.user)).toJSON();
                    delete user.password;
                    const accessToken = token_1.default.generateJwt(user);
                    res.status(200).json({ "access_token": accessToken, user: user, "refresh_token": token });
                }
            }
            catch (error) {
                res.status(401).json({ message: error });
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                yield token_1.default.removeToken(user, req.ip, req.get("user-agent"));
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                throw new error_handler_1.default(422, "Must provide your email.");
            }
            try {
                const user = yield user_1.default.getProfile(email);
                // queue_1.default.dispatch("PasswordReset", user);
                const reciver = {
                    name: user.fullName,
                    email: user.email
                };
                const templateData = {
                    name: user.fullName,
                    token: token_1.default.getPasswordToken(user)
                };
                mailer_1.default.mailByTemplate("passwordReset", templateData, reciver, "Password reset.");
                res.status(200).json({ success: true, message: "password reset token send to your email" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    reset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, password } = req.body;
            try {
                const payload = token_1.default.varifyPasswordResetToken(token);
                const user = yield user_1.default.getUserById(payload.id);
                user.password = password;
                user.save();
                res.status(200).json({ success: true, message: "password reset. please login" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    authenticateFacebook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.query;
            const user = yield user_1.default.authenticateWithFacebook(token);
            const accessToken = token_1.default.generateJwt(user);
            const refreshToken = yield token_1.default.generateRefreshToken({
                user: user._id,
                device: req.get("user-agent"),
                ip: req.ip,
            });
            res.status(200).json({ "access_token": accessToken, "refresh_token": refreshToken, user: user.toJSON() });
        });
    }
    authenticateGithub(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.query;
            const user = yield user_1.default.authenticateWithGithub(token);
            const accessToken = token_1.default.generateJwt(user);
            const refreshToken = yield token_1.default.generateRefreshToken({
                user: user._id,
                device: req.get("user-agent"),
                ip: req.ip,
            });
            res.status(200).json({ "access_token": accessToken, "refresh_token": refreshToken, user: user.toJSON() });
        });
    }
    authenticateGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.query;
            const user = yield user_1.default.authenticateWithGoogle(token);
            const accessToken = token_1.default.generateJwt(user);
            const refreshToken = yield token_1.default.generateRefreshToken({
                user: user._id,
                device: req.get("user-agent"),
                ip: req.ip,
            });
            res.status(200).json({ "access_token": accessToken, "refresh_token": refreshToken, user: user.toJSON() });
        });
    }
    authenticatLinkedin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.query;

            const user = yield user_1.default.authenticateWithLinkedIn(code);
            const accessToken = token_1.default.generateJwt(user);
            const refreshToken = yield token_1.default.generateRefreshToken({
                user: user._id,
                device: req.get("user-agent"),
                ip: req.ip,
            });
            res.status(200).json({ "access_token": accessToken, "refresh_token": refreshToken, user: user.toJSON() });
        });
    }
    // async authenticateLine(req: Request, res: Response): Promise<void> {
    //   const { access_token } = req.body;
    //   const user = await userService.authenticateWithLine(access_token);
    //   const token = Utils.generateJwt(user);
    //   res.status(200).json({ token, user });
    // }
    // TODO: We have to implement Twitter auth
    // async authenticateTwitter(req: Request, res: Response): Promise<void> {
    //   const { access_token } = req.body;
    //   const user = await userService.authenticateWithTwitter(access_token);
    // const token = Utils.generateJwt(user);
    //   // res.status(200).json({ token, user });
    //   res.json({});
    // }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ruser = req.user;
                const user = yield user_1.default.getProfile(ruser.email);
                res.status(200).json({ user: user.toJSON() });
            }
            catch (error) {
                next(error);
            }
        });
    }

    getWaitingUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.getWaitingUsers();
                res.status(200).json({ users });
            }
            catch (error) {
                next(error);
            }
        });
    }

    getAllApprovedUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ruser = req.user;
                const users = yield user_1.default.getProfile(ruser.email);
                res.status(200).json({ users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // async getAllUsers(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const users = await userService.getAllUsers();
    //     res.status(200).json({users});
    //   } catch (error) {
    //     next(error);
    //   }
    // }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ruser = req.body;
            ruser._id = req.user._id;
            const user = yield user_1.default.updateProfile(ruser);
            res.status(200).json({ user: user.toJSON() });
        });
    }
    // async checkExistingEmailOrWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
    //   const { email, workspace } = req.body;
    //   const user = email ? await userService.getUserByEmail(email) : null;
    //   const wp = workspace ? await workspaceService.getWorkspace(workspace) : null; 
    //   if (user) {
    //     res.status(200).json({notUniqueMessage: "E-mail already in use"});
    //   } else if (wp) {
    //     res.status(200).json({notUniqueMessage: "Workspace already exists"});
    //   } else {
    //     res.status(200).json({success: "The email or workspace is unique"});
    //   }
    // }
    authEmailExists(req, res, next) {
        const { email } = req.body;
        res.status(200).json({ unique: `This email: ${email} is unique` });
    }
    authWorkspaceExists(req, res, next) {
        const { workspace } = req.body;
        res.status(200).json({ unique: `This workspace: ${workspace} is unique` });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.js.map