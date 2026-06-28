"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAstDateString = exports.getAstDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
// Set default timezone to Atlantic Standard Time (AST) which is America/Puerto_Rico or America/Santo_Domingo (UTC-4)
dayjs_1.default.tz.setDefault('America/Santo_Domingo');
const getAstDate = (date) => {
    return (0, dayjs_1.default)(date).tz('America/Santo_Domingo');
};
exports.getAstDate = getAstDate;
const getAstDateString = (date) => {
    return (0, exports.getAstDate)(date).format();
};
exports.getAstDateString = getAstDateString;
//# sourceMappingURL=date.js.map