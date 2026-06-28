"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const date_1 = require("./utils/date");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Set timezone for the Node process
process.env.TZ = 'America/Santo_Domingo';
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Spa Ocular API is running',
        currentTime: (0, date_1.getAstDateString)(),
        timezone: process.env.TZ,
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port} in timezone ${process.env.TZ}`);
});
//# sourceMappingURL=server.js.map