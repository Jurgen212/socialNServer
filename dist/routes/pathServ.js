"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate-fields");
const express_validator_1 = require("express-validator");
const pathServ_1 = require("../controllers/pathServ");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('path', 'El path/link del servidor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty(),
    validate_fields_1.validateFields
], pathServ_1.postPathServ);
router.get('/', pathServ_1.getPathServ);
//# sourceMappingURL=pathServ.js.map