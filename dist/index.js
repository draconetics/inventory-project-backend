"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// rest of the code remains same
const brand_route_1 = __importDefault(require("./routes/brand.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const sale_route_1 = __importDefault(require("./routes/sale.route"));
const client_route_1 = __importDefault(require("./routes/client.route"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use(product_route_1.default);
app.use(brand_route_1.default);
app.use(sale_route_1.default);
app.use(client_route_1.default);
app.use(error_middleware_1.errorHandler);
const { PORT } = require('./config/portConfig');
const db = require('./config/db');
db.connect()
    .then(() => {
    console.log('database connected..');
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT} with typescript`);
    });
});
module.exports = app;
