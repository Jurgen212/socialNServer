"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jswt_1 = require("../middlewares/validate-jswt");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Invalid mongo Id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existUserById),
    validate_fields_1.validateFields
], usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'The password is required').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'The mail is invalid').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExist),
    validate_fields_1.validateFields
], usuarios_1.postUsuarios);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Invalid mongo Id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existUserById),
    validate_fields_1.validateFields
], usuarios_1.putUsuarios);
router.delete('/:id', [
    validate_jswt_1.validateJWT,
    (0, express_validator_1.check)('id', 'Invalid mongo Id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existUserById),
    validate_fields_1.validateFields
], usuarios_1.deleteUsuarios);
module.exports = router;
//# sourceMappingURL=usuarios.js.map