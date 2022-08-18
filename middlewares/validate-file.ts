

export const validateFiles = ( req: any, res: any, next: any ) => {

    if( !req.files || Object.keys( req.files ).length === 0 || !req.files.archivo ){

        return res.status( 400 ).send('No file to send -- Archivo( body )');
    };

    next();
};