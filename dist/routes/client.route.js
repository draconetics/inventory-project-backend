"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const router = (0, express_1.Router)();
router.get('/api/clients', client_controller_1.getClientList);
router.post('/api/clients', client_controller_1.createClient);
router.get('/api/clients/:id', client_controller_1.getClientById);
router.put('/api/clients/:id', client_controller_1.updateClientById);
router.delete('/api/clients/:id', client_controller_1.deleteClientById);
exports.default = router;
