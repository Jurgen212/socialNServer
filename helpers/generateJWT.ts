
import jwt from 'jsonwebtoken';


export const createJWT = ( uid: string, name : string, mail: string ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name, mail };

        jwt.sign( payload, process.env.SECRETORPRIVATEKE + ""  , {
            expiresIn:'100h'
            
        }, ( err, token ) => {

            if( err ){
                console.log( err );
                reject("Token wasn't created ");
            }
            else{
                resolve( token );
            }

        })

    })

}