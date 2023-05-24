const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const path = require('path');
// RUTAS
const userRoutes = require("../src/routes/userRoutes");
const loginRoutes = require("../src/routes/loginRoutes");
require('dotenv').config()



class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT ;

        this.routes();

    }

    routes() {

        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json({ type: "*/*" }));
        this.app.use(express.static("public"))

        this.app.get("/", (req, res) => {
            res.json({ message: `Raiz de la API con puerto: ${this.port}` })
        });
        this.app.get('/google', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
          })
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', '404.html'))
          })


        // RUTAS A USAR
        this.app.use("/api/user", userRoutes);
        this.app.use("/api/auth", loginRoutes);

        // MANEJO DE LOS ERRORES
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).json({ message: 'Llama al backend y dile que hay algo mal' });
        });



    }

    listen() {
        // Listen del servidor
        this.app.listen(this.port, () => console.log(`El servidor está escuchando en el puerto`, this.port));
    }
}

module.exports = Server;