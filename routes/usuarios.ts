import { Router }   from "express"          ;
import { check }    from "express-validator";

import { getUsuario, getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } from '../controllers/usuarios';

import { validateFields }   from '../middlewares/validate-fields'   ;
import { validateJWT }      from "../middlewares/validate-jswt"     ;

import { emailExist, existUserById } from '../helpers/db-validators';



const router = Router();


router.get      ('/',getUsuarios       );

router.get      ('/:id'     , [ 
                                check('id', 'Invalid mongo Id').isMongoId() ,
                                check('id').custom( existUserById )         ,    
                                validateFields ],getUsuario        );


router.post     ('/'        , [
                                check('nombre'  , 'The name is required'    ).not().isEmpty()       ,
                                check('password', 'The password is required').isLength({ min: 6 })  ,
                                check('correo', 'The mail is invalid'       ).isEmail()             ,
                                check('correo')                              .custom( emailExist   ),
                                validateFields ],postUsuarios      );



router.put      ('/:id'     , [
                                check('id', 'Invalid mongo Id').isMongoId() ,
                                check('id').custom( existUserById )         ,    
                                validateFields ], putUsuarios        );


router.delete   ('/:id'     , [ 
                                validateJWT,
                                check('id', 'Invalid mongo Id').isMongoId() ,
                                check('id').custom( existUserById )         ,
                                validateFields ],deleteUsuarios    );



module.exports = router;