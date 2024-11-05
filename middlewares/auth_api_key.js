
//http://localhost:3000/api/books?API_KEY=123abc

const checkApiKey = function (req, res, next) {
    // Comprobar si existe API KEY en BBDD pasada por cliente
    // SELECT * FROM ... WHERE API_KEY = req.query
    if (req.query.API_KEY === process.env.API_KEY) {
        next(); // Pasa a la siguiente tarea
    } else {
        //Mando mensaje de error
        res.status(401).send("Error. API KEY no proveída o erronea");
    }
}

module.exports = checkApiKey;