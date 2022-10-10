const Server = require('../models/server')
const Usuarios = require('../classes/usuarios.js');

const usuarios = new Usuarios();


Server.io('connection', ( client: { on: (arg0: string, arg1: (data: { nombre: any; sala: any; }, callback: (arg0: { err: boolean; msg: string; }) => any) => any) => void; } ) => {
    
    client.on('entrarChat', ( data: { nombre: any; sala: any; }, callback: (arg0: { err: boolean; msg: string; }) => any ) =>{

        if( !data.nombre || !data.sala ){

            return callback({
                err: true,
                msg: 'Nombre de sala es necesario'
            })
        }
    })
})