const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE API DE DE PRODUCTOS", () => {
    let servidor = app.listen(3000);
    describe("probar ruta /api/productos con MÉTODO GET", () => {
        it("Validar respuesta de la ruta productos.", (done) => {
            chai.request(servidor)
                .get("/api/productos")
                .end((error, res) => {
                    assert.equal(res.status, 200, "Código de estado no corresponde.")
                    assert.isObject(res.body, "Respuesta debe ser un objeto")
                    assert.exists(res.body.code, "No existe la propiedad code.");
                    assert.equal(res.body.code, 200, "Código de estado el body no es 200.")
                    assert.exists(res.body.message, "No existe la propiedad message");
                    assert.exists(res.body.data, "No existe la propiedad data.");
                    assert.isArray(res.body.data, "Propiedad data del body no es un array");
                });
            done();
        })
    })

    describe("probar ruta /api/productos/:id con MÉTODO GET", () => {
        it("Validar ruta /api/productos/:id, para filtrar productos por ID. (producto existente)", (done) => {
            chai.request(servidor)
                .get("/api/productos/1")
                .end((error, res) => {
                    assert.equal(res.status, 200, "Código de estado no corresponde.")
                    let producto = res.body.data;
                    assert.isObject(producto, "Producto no es un objeto.");
                    assert.exists(producto.id, "No existe la propiedad id");
                    assert.exists(producto.nombre, "No existe la propiedad nombre");
                    assert.exists(producto.precio, "No existe la propiedad precio");
                    assert.isNumber(producto.precio, "Precio no es un de tipo Number.")
                });
            done();
        });
    });
})



