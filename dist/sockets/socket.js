"use strict";
const Server = require('../models/server');
const Usuarios = require('../classes/usuarios.js');
const usuarios = new Usuarios();
Server.io('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                msg: 'Nombre de sala es necesario'
            });
        }
    });
});
//# sourceMappingURL=socket.js.map