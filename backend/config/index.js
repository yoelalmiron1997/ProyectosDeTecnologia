//valido el ambiente que estoy

if(process.env.NODE_ENV !== "production"){

    require('dotenv').config();
}

//exportamos un objeto para que todas las variables de entorno esten en un lugar.
module.exports={

    PORT:process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
};