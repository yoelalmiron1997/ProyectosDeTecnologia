const mongoose = require ("mongoose");
const { Schema } = mongoose; //Clase Schema nos ayuda a generar los esquemas de mongoose

const TechnologySchema = new Schema ({ //En el constructor le estamos pasando un objeto
    name: {type: String, maxlength: 50},
    description: {type: String},
    logo:{type: String},
    tags: [{type: String}] //Es un vector
},
{ timestamps: {createdAt:true, updatedAt:true} }//Objeto
);
//exportamos el modelo
module.exports = mongoose.model("Technology", TechnologySchema);