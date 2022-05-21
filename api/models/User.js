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
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        trim: true,
        type: String,
        unique: true,
        required: true
    },
    password: String,
    facebook: mongoose_1.default.Schema.Types.Mixed,
    github: mongoose_1.default.Schema.Types.Mixed,
    twitter: mongoose_1.default.Schema.Types.Mixed,
    google: mongoose_1.default.Schema.Types.Mixed,
    emailVerifyAt: Date,
    passwordResetAt: Date,
    firstName: String,
    lastName: String,
    gender: String,
    address: String,
    website: String,
    city: String,
    state: String,
    country: String,
    occupation: String,
    institute: String,
    bio: String,
    mobile: String,
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
        required: false
    },
    role: {
        type: String,
        default: "student"
    },
}, {
    timestamps: true,
    skipVersioning: true,
    toObject: {
        transform(doc, ret) {
            delete ret.password;
        }
    },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            delete ret.password;
        }
    }
});
/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    user.password = bcryptjs_1.default.hashSync(user.password, bcryptjs_1.default.genSaltSync(10));
    next();
});
const comparePassword = function (candidatePassword) {
    return bcryptjs_1.default.compareSync(candidatePassword, this.password);
};
userSchema.methods.comparePassword = comparePassword;
userSchema.methods.switchWorkspace = function (workspaceId) {
    this.workspace = workspaceId;
    this.save();
};
/**
 * Helper method for getting user's gravatar.
 */
userSchema.virtual("avatar").get(function () {
    const size = 200;
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto_1.default.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
});
userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
});
userSchema.post("findOne", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield doc.populate("workspace").execPopulate();
        }
        next();
    });
});
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map