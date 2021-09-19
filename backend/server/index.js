const express = require("express");
const server = express();
//el cors nos ayuda a evitar que los request de angular, no sean bloqueados
const cors = require("cors");
const { Technology } = require("../models");

//Toda la informacion que trabaja a nivel request es tratada como un json
server.use(express.json());
//Vamos a colocar PUblic como una carpeta estatica para que su contenido sea accesible directamente, sin tener que pasar por un controlador o nuestra API
server.use(express.static(__dirname + "/../public"));
server.use(cors());

//Primer EndPoint que nos devuelva todas las tecnologias que tenemos
server.get("/api/technologies", async(req, res)=>{

    let technologies = await Technology.find();
    //console.log(technologies);
    technologies = technologies.map((technology)=>{
        technology.logo= `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology;
    });
    //retorno un objeto
    return res.send({ error: false , data: technologies });
});

//segundo EndPoint

server.get("/api/technology/:id", async(req, res)=>{
    const { id } = req.params;
    let technology = await Technology.findById(id);
        technology.logo= `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        
    //retorno un objeto
    return res.send({ error: false , data: technology });
});

//Tercer EndPoint - Buscar
server.get("/api/technology/search/:name", async(req, res)=>{
    //Destructuro el name de request
    const { name } = req.params;
    let technologies = await Technology.find({name:{$regex: new RegExp( name , "i")}});
    //console.log(technologies);
    technologies = technologies.map((technology)=>{
        technology.logo= `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology;
    });
    //retorno un objeto
    return res.send({ error: false , data: technologies });
});


module.exports = server;
//NO inicializo porque eso se hace en otro archivo

//Aca escribimos todo el codigo que maneje nuestra rutas y middleware, no es la mejor practica.

