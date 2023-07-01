const chai = require("chai");
const assert = chai.assert;

let calculadora = require("../calculadora.js");


/* describe("Verifica string", () => {
    it("verificar si valor entregado es string", () => {
        const string = 5;
        assert.isString(string, "no es un string.");
    });
});
 */

describe("Verifica funcionamiento de la calculadora (sumar)", () => {
    let resultado;
    it("Prueba de método sumar usando números", () => {
        resultado = calculadora.sumar(2, 3);
        assert.equal(resultado, 5, "Resultado de suma incorrecto.")
    });
    it("Prueba de método sumar usando números en formato string", () => {
        resultado = calculadora.sumar("2", "3");
        assert.equal(resultado, 5, "Resultado de suma incorrecto.");
    });
    it("Prueba de método sumar pasando valores que no sean números", () => {
        resultado = calculadora.sumar(false, true);
        assert.equal(resultado, 0, "Falta validar los tipos de datos diferentes a números");
    });
    it("Prueba de método sumar pasando valores caracteres raros", () => {
        resultado = calculadora.sumar("@", "'");
        assert.equal(resultado, 0, "Falta validar los tipos de datos diferentes a números");
    });
    it("Prueba de método sumar cuando se pase un sólo argumento", () => {
        resultado = calculadora.sumar(5, undefined);
        assert.equal(resultado, 5, "No cumple con prueba de paso de un argumento.");
    });

});