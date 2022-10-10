"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_fields_1 = require("../middlewares/validate-fields");
const express_validator_1 = require("express-validator");
const pathServ_1 = require("../controllers/pathServ");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)("path", "El path/ruta es obligatoria").not().isEmpty(),
    validate_fields_1.validateFields
], pathServ_1.postPathServ);
router.put('/', [
    (0, express_validator_1.check)("path", "El nuevo path es obligatorio anexarlo").not().isEmpty(),
    validate_fields_1.validateFields
], pathServ_1.putPathServ);
router.get('/', pathServ_1.getPathServ);
module.exports = router;
//# sourceMappingURL=path.js.map