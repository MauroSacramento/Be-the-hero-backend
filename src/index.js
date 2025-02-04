const express = require('express');
const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
    res.json({
        evento: "Semana omnistack 10",
        aluno: "Mauro Bastos"
    });
})

app.listen(3333);
