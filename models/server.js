const express = require('express');
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port =  process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //routes
        this.routes();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );
        ////directorio publico
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        //this.app.use( '/api/usuarios', require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en", this.port)
        });
    }

}

module.exports = Server;