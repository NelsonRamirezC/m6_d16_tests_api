const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const fs = require("fs");

//middleware
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body

//ENDPOINT PRINCIPAL
app.get("/api/productos", (req, res) => {
    let data = JSON.parse(
        fs.readFileSync(__dirname + "/productos.json", "utf8")
    );
    let productos = data.productos;
    res.send({ code: 200, message: "Listado de productos.", data: productos });
});

app.get("/api/productos/:id", (req, res) => {
    let id = req.params.id;
    let data = JSON.parse(
        fs.readFileSync(__dirname + "/productos.json", "utf8")
    );
    let productos = data.productos;
    let producto = productos.find((producto) => producto.id == id);
    res.send({ code: 200, message: "Producto encontrado.", data: producto });
});

app.delete("/api/productos/:id", (req, res) => {
    let id = req.params.id;
     let data = JSON.parse(
         fs.readFileSync(__dirname + "/productos.json", "utf8")
     );
     let productos = data.productos;
    let producto = productos.find((producto) => producto.id == id);
    if (!producto) {
        return res.status(404).send({code: 404, message: "Producto que intenta eliminar no existe"})
    }
    let indice = productos.findIndex((producto) => producto.id == id);

    if (indice != -1) {
        productos.splice(indice, 1);
        fs.writeFileSync(__dirname + "/productos.json", JSON.stringify(data, null, 2), "utf8");
    }

    res.send({ code: 200, message: "Producto eliminado.", data: producto });
});

module.exports = app;
