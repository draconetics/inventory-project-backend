"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
//default development port
exports.PORT = 4000;
if (process.env.NODE_ENV === 'test') {
    exports.PORT = 3001;
}
if (process.env.NODE_ENV === 'production') {
    if (!process.env.PORT) {
        console.log("PORT not declared");
        process.exit(1);
    }
    exports.PORT = parseInt(process.env.PORT, 10);
}
