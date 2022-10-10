import { Router } from 'express';
import { validateFields } from '../middlewares/validate-fields';
import { check } from 'express-validator';

import { postPathServ, getPathServ, putPathServ  } from '../controllers/pathServ';

const router = Router();


router.post('/', [
    check("path", "El path/ruta es obligatoria").not().isEmpty(),
    validateFields
], postPathServ );

router.put('/', [
    check("path", "El nuevo path es obligatorio anexarlo").not().isEmpty(),
    validateFields
], putPathServ )


router.get('/', getPathServ )



module.exports = router