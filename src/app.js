require("dotenv").config();
const mongoose = require("mongoose");
const Server = require("../models/server");
const connectDB = require("../database/conexion");

const server = new Server

server.listen();

//conección a mongoDB
// mongoose.connect(process.env.MONGODB_URI)
//         .then( () => {console.log("Concexión establecida a la base de datos")} )
//         .catch((err) => console.log(`Error: ${err}`))
connectDB();