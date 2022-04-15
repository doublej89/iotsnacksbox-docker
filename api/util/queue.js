"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bull_1 = __importDefault(require("bull"));
const eventsPromise = Promise.resolve().then(() => __importStar(require("../queue/index")));
// 1. Initiating the Queue
class BullQueue {
    constructor() {
        this.connction = new bull_1.default("webhook");
        this.connction.process((job, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = job.data.name;
                eventsPromise.then((events) => __awaiter(this, void 0, void 0, function* () {
                    if (events.hasOwnProperty(name)) {
                        yield (events[name]).heandle(job.data.data);
                    }
                })).catch(() => {
                    done(new Error("Queue event Not found"));
                });
                done();
            }
            catch (error) {
                done(error);
            }
        }));
    }
    dispatch(name, data, options = {}) {
        const qOption = Object.assign({}, options, {
            delay: 3000,
            attempts: 3
        });
        this.connction.add({ name, data }, qOption);
    }
    dispatchNow(name, data) {
        this.dispatch(name, data, { delay: 0 });
    }
}
exports.default = new BullQueue();
//# sourceMappingURL=queue.js.map