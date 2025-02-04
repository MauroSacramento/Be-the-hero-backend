const express = require('express')

const routes = express.Router();

routes.post('/users', (req, res) => {
    res.json({
        evento: "Semana omnistack 10",
        aluno: "Mauro Bastos"
    });
})

module.exports = routes;