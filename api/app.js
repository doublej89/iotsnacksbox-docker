"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const socketIo = __importStar(require("socket.io"));
const cron_1 = require("cron");
const secrets_1 = require("./util/secrets");
const component = __importStar(require("./controllers/api/component"));
const widget = __importStar(require("./controllers/api/widget"));
const workspace_1 = __importDefault(require("./controllers/api/workspace"));
const payment_1 = __importDefault(require("./controllers/api/payment"));
const subscription_1 = __importDefault(
  require("./controllers/api/subscription")
);
const plan_1 = __importDefault(require("./controllers/api/plan"));
// API keys and Passport configuration
const registryController = __importStar(require("./controllers/api/registry"));
const middlewares_1 = __importDefault(require("./middlewares"));
const user_1 = __importDefault(require("./controllers/user"));
const snacksbox = __importStar(require("./controllers/snacksbox"));
const error_response_1 = __importDefault(require("./config/error-response"));
const path_1 = __importDefault(require("path"));
const contact_1 = __importDefault(require("./controllers/api/contact"));
const hourly_workspace_capacity_check_1 = __importDefault(
  require("./cronjobs/hourly-workspace-capacity-check")
);
const monthly_subscription_check_1 = __importDefault(
  require("./cronjobs/monthly-subscription-check")
);
const snacksbox_seed_1 = __importDefault(require("./seed/snacksbox-seed"));
// Create Express server
const app = express_1.default();
// const job = new cron_1.CronJob(
//   "1 0 0-23 * * *",
//   hourly_workspace_capacity_check_1.default
// );
// job.start();
// console.log("cron job started");
// const dailyJob = new cron_1.CronJob(
//   "1 0 1-31 * *",
//   monthly_subscription_check_1.default
// );
// // const dailyJob = new CronJob("*/3 * * * *", monthlySubscriptionCheck);
// dailyJob.start();
// console.log("subscription check job started");
// Connect to MongoDB
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
  .connect(secrets_1.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {})
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors_1.default({ origin: "*", credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(middlewares_1.default.jsonSyntax);
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
const io = socketIo.listen(server, { origins: "*:*" });
app.use((req, res, next) => {
  req.io = io;
  next();
});
snacksbox_seed_1.default.seedingSnacksBoxPlan();
snacksbox_seed_1.default.seedingSnacksboxProduct();
/**
 * Primary app routes.
 */
app.get("/api", (req, res) => {
  res.json({
    success: true,
    databse: mongoose_1.default.connection.readyState,
  });
});
app.post(
  "/api/signup",
  user_1.default.validate("signup"),
  user_1.default.signup
);
app.post("/api/login", user_1.default.validate("login"), user_1.default.login);
app.post(
  "/api/invite-friend",
  user_1.default.validate("forget"),
  user_1.default.inviteFriend
);
app.post(
  "/api/varify-token",
  user_1.default.validate("varifyToken"),
  user_1.default.varifyToken
);
app.post(
  "/api/verify-email",
  user_1.default.validate("varifyToken"),
  user_1.default.emailVerify
);
app.post("/api/refresh-token", user_1.default.getToken);
app.post("/api/logout", middlewares_1.default.auth, user_1.default.logout);
app.post(
  "/api/workspace-invitation",
  middlewares_1.default.auth,
  user_1.default.validate("workspaceInvitation"),
  user_1.default.workspaceInvitation
);
app.get("/api/user", middlewares_1.default.auth, user_1.default.getProfile);
app.post("/api/forgot", user_1.default.forgot);
app.post("/api/reset", user_1.default.validate("reset"), user_1.default.reset);
app.put("/api/user", middlewares_1.default.auth, user_1.default.updateProfile);
app.post(
  "/api/auth/email-exists",
  user_1.default.validate("authEmailExists"),
  user_1.default.authEmailExists
);
app.post(
  "/api/auth/workspace-exists",
  user_1.default.validate("authWorkspaceExists"),
  user_1.default.authWorkspaceExists
);
app.post(
  "/api/auth/switch-workspace",
  middlewares_1.default.auth,
  user_1.default.switchWorkspace
);
// app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);
app.get("/api/action/:action_name", snacksbox.getAction);
app.get("/api/actions", snacksbox.getActions);
app.post("/api/trigger/:trigger_name", snacksbox.postTrigger);
app.post("/api/actions", snacksbox.postActions);
app.post("/api/action", snacksbox.postAction);
// app.post("/check-existing-email-or-workspace", userController.checkExistingEmailOrWorkspace);
app.post("/api/contact", contact_1.default.contactUs);
/**
 * API examples routes.
 */
app.get("/api/components", middlewares_1.default.auth, component.getComponents);
app.get(
  "/api/components/self",
  middlewares_1.default.auth,
  component.getSelfComponents
);
app.post(
  "/api/components",
  middlewares_1.default.auth,
  component.postComponent
);
app.put(
  "/api/components/:id",
  middlewares_1.default.auth,
  component.putComponent
);
app.put(
  "/api/components/:id/active",
  middlewares_1.default.auth,
  component.activeComponent
);
app.delete(
  "/api/components/:id",
  middlewares_1.default.auth,
  component.deleteComponent
);
app.post(
  "/api/components/:id/add-actions",
  middlewares_1.default.auth,
  component.addActions
);
app.post(
  "/api/components/:id/add-triggets",
  middlewares_1.default.auth,
  component.addTriggers
);
app.get(
  "/api/registries",
  middlewares_1.default.auth,
  registryController.getRegistries
);
app.post(
  "/api/registries",
  middlewares_1.default.auth,
  registryController.addRegistry
);
app.put(
  "/api/registries/:id",
  middlewares_1.default.auth,
  registryController.updateRegistry
);
app.delete(
  "/api/registries/:id",
  middlewares_1.default.auth,
  registryController.deleteRegistry
);
app.post(
  "/api/registries/action",
  middlewares_1.default.auth,
  registryController.postAction
);
app.get(
  "/api/registries/trigger",
  middlewares_1.default.auth,
  registryController.getTrigger
);
app.get("/api/widgets", middlewares_1.default.auth, widget.getWidgets);
app.post("/api/widgets", middlewares_1.default.auth, widget.storeWidget);
app.delete(
  "/api/widgets/:id",
  middlewares_1.default.auth,
  widget.destroyWidget
);
app.get(
  "/api/workspace/my-workspaces",
  middlewares_1.default.auth,
  workspace_1.default.myWorkspaces
);
app.get(
  "/api/workspace/members",
  middlewares_1.default.auth,
  workspace_1.default.getMembers
);
app.get(
  "/api/workspace/transactions",
  middlewares_1.default.auth,
  workspace_1.default.getTransactions
);
app.post(
  "/api/workspace",
  middlewares_1.default.auth,
  workspace_1.default.createWorkspace
);
app.post("/api/deposit", middlewares_1.default.auth, payment_1.default.deposit);
app.post(
  "/api/webhook/payment",
  middlewares_1.default.auth,
  payment_1.default.webhook
);
app.post(
  "/api/subscription",
  middlewares_1.default.auth,
  subscription_1.default.createSubscription
);
app.get(
  "/api/subscription",
  middlewares_1.default.auth,
  subscription_1.default.getSubscriptions
);
app.post("/api/plan", middlewares_1.default.auth, plan_1.default.createPlan);
app.get("/api/plan", middlewares_1.default.auth, plan_1.default.getPlans);
app.post(
  "/api/snacksbox/verify",
  middlewares_1.default.auth,
  snacksbox.verifySnackBox
);
/**
 * OAuth authentication routes. (Sign in)
 */
app.post("/api/auth/signup/facebook", user_1.default.authenticateFacebook);
app.post("/api/auth/signup/github", user_1.default.authenticateGithub);
app.post("/api/auth/signup/google", user_1.default.authenticateGoogle);
app.post("/api/auth/signup/linkedin", user_1.default.authenticatLinkedin);
    
app.get("/api/admin/waiting", middlewares_1.default.authAdmin, user_1.default.getWaitingUsers);
app.get("/api/admin/approved", middlewares_1.default.authAdmin, user_1.default.getAllApprovedUsers);
app.delete("/api/admin/user/:id", middlewares_1.default.authAdmin, user_1.default.deleteUser);
app.put("/api/admin/user/approve", middlewares_1.default.authAdmin, user_1.default.approveUser);
app.put("/api/admin/user/disapprove", middlewares_1.default.authAdmin, user_1.default.disapproveUser);
app.get("/api/admin/workspace", middlewares_1.default.authAdmin, workspace_1.default.getAllWorkspaces);
app.put("/api/admin/workspace", middlewares_1.default.authAdmin, workspace_1.default.updateWorkspace);
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });
// app.post("/add-user", userController.addUser);
// app.delete("/delete-user", userController.deleteUserFromWorkspace);
// Handling any unexpected errors
app.use(error_response_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
