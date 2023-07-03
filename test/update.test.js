const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE MODIFICACIÓN DE USUARIOS EN API (PUT USUARIOS)", () => {
    let servidor = app.listen(3000);

    let nuevosDatos = {
        nombre: "Producto modificado",
        precio: 2500,
    };

    let responsePut;
    chai.request(servidor)
        .put("/api/productos/" + 1)
        .send(nuevosDatos)
        .end((error, res) => {
            responsePut = res;
        });

    it("Verificar UPDATE DE USUARIOS, código respuesta 201, retorne objeto modificado.", (done) => {
        let body = responsePut.body;
        assert.equal(responsePut.status, 201, "código de respuesta no corresponde.");
        assert.equal(body.code, 201, "código de respuesta no corresponde.");
        done();
    });

    it("Retorno sea un objeto, y cuente con id que igual al ingresado.", (done) => {
        let body = responsePut.body;
        let producto = responsePut.body.data;
        assert.isObject(body.data, "Retorno no es un objeto");
        assert.exists(producto.id, "No retorna producto con un id");
        assert.propertyVal(
            producto,
            "id",
            1,
            "ID no corresponde al producto modificado."
        );
        done();
    });
    it("Retorno sea un objeto, y cuente con id que igual al ingresado.", (done) => {
        let body = responsePut.body;
        let producto = responsePut.body.data;
        assert.propertyVal(producto, "nombre", "Producto modificado", "Nombre de producto no fue modificado.");
        assert.propertyVal(producto, "precio", 2500, "Precio de producto no fue modificado.");
        done();
    });


});
