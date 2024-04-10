"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log(`${req.ip}, ${req.timestamp}`);
    next();
}
exports.logger = logger;
