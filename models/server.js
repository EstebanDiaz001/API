require("dotenv").config();
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
// RUTAS
const loginRoutes = require("../src/routes/login");
const registroRoutes = require("../src/routes/registro");
const consultas = require("../src/routes/consultas")


class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.routes();

    }

    routes() {

        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json({ type: "*/*" }));

        this.app.get("/", (req, res) => {
            res.json({ message: `Raiz de la API con puerto: ${this.port}` })
        });

        // RUTAS A USAR
        this.app.use("/api", consultas);
        this.app.use("/api", loginRoutes);
        this.app.use("/api", registroRoutes);

        // MANEJO DE LOS ERRORES
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            if (err.type === `entity.too.large`) return res.status(413).send({ message: `La carga es demasiado grande máximo 10mb` });
            res.status(500).send({ message: 'Algo salió mal!' });
        });



    }

    listen() {
        // Listen del servidor
        this.app.listen(this.port, () => console.log(`El servidor está escuchando en el puerto`, this.port));
    }
}

module.exports = Server;