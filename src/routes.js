const express = require('express')
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;