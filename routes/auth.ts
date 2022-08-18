import { Router } from 'express';
import { check } from 'express-validator';

import { loginController } from '../controllers/auth';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/', [
                        check('correo', 'The mail is required' ).isEmail(),
                        check('password', 'The password is required').not().isEmpty(),
                        validateFields
], loginController )


module.exports =  router;