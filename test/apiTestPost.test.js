const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE CREACIÓN DE USUARIOS EN API (POST USUARIOS)", async () => {
    let servidor = app.listen(3000);

    let nuevoProducto = {
        nombre: "Jugo de 2 litros watts",
        precio: 1500,
    };

    let responsePost;
    chai.request(servidor)
        .post("/api/productos")
        .send(nuevoProducto)
        .end((error, res) => {
            responsePost = res;
        });
    it("Validar código de estados sea 201 y propiedad code exista y tambien sea 201", (done) => {
        assert.equal(
            responsePost.status,
            201,
            "Código de estado diferente a 201"
        );
        assert.exists(
            responsePost.body.code,
            "Debe existir propiedad code en objeto data."
        );
        assert.propertyVal(
            responsePost.body,
            "code",
            201,
            "código de respuesta no es 201."
        );
        done();
    });
    it("Validar que producto creado sea retornado y tenga propiedad data, la cual sea un objeto", (done) => {
        assert.exists(
            responsePost.body.data,
            "No existe propiedad data en la respuesta"
        );
        assert.isObject(
            responsePost.body.data,
            "Data retornada no es un objeto."
        );
        done();
    });
    it("Validar si producto retornado nos trae un id", (done) => {
        assert.exists(
            responsePost.body.data.id,
            "Objeto de respuesta no tiene propiedad id."
        );
        done();
    });

    let responseGet;
    console.log("POST", responsePost);

    chai.request(servidor)
        .get("/api/productos/" + 1)
        .end((error, res) => {
            responseGet = res;
        });
    it("Verificar si producto recientemente creado se encuentra en base de datos.", (done) => {
        assert.equal(
            productoCreado?.id,
            responseGet?.data?.id,
            "Producto no existe en base de datos."
        );
        done();
    });
});
