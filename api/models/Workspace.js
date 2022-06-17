"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoosePaginate = require('mongoose-paginate-v2');
const resourceuser_1 = __importDefault(require("./plugins/resourceuser"));
const auth_1 = __importDefault(require("../services/auth"));
// type addUserFuncton = (user: mongoose.Types.ObjectId, role: string) => void
const WorkspaceSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    institute: String,
    company: String,
    users: [{
            user: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
            },
            role: { type: String, default: "member" }
        }],
    storage: {
        type: Number,
        default: 0
    },
    request: {
        type: Number,
        default: 0
    },
    features: {
        members: {
            type: Number,
            default: 1
        },
        component: {
            type: Number,
            default: 0
        },
        registry: {
            type: Number,
            default: 1
        },
        widget: {
            type: Number,
            default: 3
        },
        requestPerMonth: {
            type: Number,
            default: 1000
        },
        requestPrice: {
            amount: {
                type: Number,
                default: 1
            },
            currency: {
                type: String,
                default: "USD"
            }
        },
        storage: {
            type: Number,
            default: 10
        },
        storagePrice: {
            amount: {
                type: Number,
                default: 1
            },
            currency: {
                type: String,
                default: "USD"
            }
        },
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    restrictedBalance: {
        type: Boolean,
        default: false
    },
    pendingBalance: {
        type: Number,
    },
    currency: {
        type: String,
        default: "USD"
    },
    products: Array,
});
WorkspaceSchema.plugin(resourceuser_1.default);
WorkspaceSchema.plugin(mongoosePaginate);
// WorkspaceSchema.methods.addUser = async function (user: mongoose.Types.ObjectId, role: string) {
//     role = role || "member";
//     this.set("users", {$push : {users: {user, role}}});
//     await this.save();
// };
WorkspaceSchema.pre("save", function (next) {
    if (this.isNew) {
        this.set("users", [{ user: auth_1.default.id(), role: "admin" }]);
    }
    next();
});
exports.Workspace = mongoose_1.default.model("Workspace", WorkspaceSchema);
//# sourceMappingURL=Workspace.js.map