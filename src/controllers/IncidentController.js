const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count() // Pra guardar o número completo dos casos

        const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count('*')']); 
        response.json(incidents);
    },

    async create(req, res) {
        const { title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id })
    },

    async delete(req, res) {
        const {id} = req.params;
        const ong_id = req.headers.authorization;
        console.log(id);
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({error: 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();
        return res.status(204).send(); // Resposta que deu sucesso mas não tem conteúdo para retornar
    }
}