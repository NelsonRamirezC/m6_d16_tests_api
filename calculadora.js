let calculadora = {
    sumar: (a, b) => {
        if ((typeof a == "boolean") || (typeof b == "boolean")) {
            return 0;
        }
        a = Number(a);
        b = Number(b);

        if (!a && b) {
            return b
        }
        if (!b && a) {
            return a
        }
        
        let resultado = a + b;
        if (isNaN(resultado)) {
            return 0;
        }
        
        return a + b;
    },
    restar: (a, b) => {
        return a - b;
    },
};

module.exports = calculadora;
