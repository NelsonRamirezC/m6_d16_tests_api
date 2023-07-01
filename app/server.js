const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");

//middleware
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body

let productos = [
    {
        id: 1,
        nombre: "Galletas",
        precio: 5000
    },
    {
        id: 2,
        nombre: "Bebiba de 3 litros",
        precio: 2500
    }
]

//ENDPOINT PRINCIPAL
app.get("/api/productos", (req, res) => {
    res.send({code: 200, message: "Listado de productos.", data: productos})
})

app.get("/api/productos/:id", (req, res) => {
    let id = req.params.id;
    let producto = productos.find(producto => producto.id == id)
    res.send({ code: 200, message: "Producto encontrado.", data: producto });
});

module.exports = app;