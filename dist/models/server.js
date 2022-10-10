"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const http_1 = __importDefault(require("http"));
class Server {
    constructor() {
        this.apiPath = {
            usuarios: '/api/usuarios',
            login: '/api/login',
            pathRuta: '/api/path'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        //Connect to database
        this.connectDb();
        //Start the middlewares
        this.middlewares();
        //Active the routes
        this.routes();
        this.serverIo = http_1.default.createServer(this.app);
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Publica ( contenido estatico )
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.usuarios, require('../routes/usuarios'));
        this.app.use(this.apiPath.login, require('../routes/auth'));
        this.app.use(this.apiPath.pathRuta, require('../routes/path'));
    }
    ;
    listen() {
        this.serverIo.listen(this.port, () => {
            console.log("Server running in port " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map