import OfertaColetiva from "../models/ofertacoletiva";

class ofertaColetivaController {
    async post(req, res) {
        try {
            const ofertaExistente = await OfertaColetiva.findOne({
                where: {
                    ano: req.body.ano,
                    edicao: req.body.edicao
                }
            })

            if(ofertaExistente) {
                return res.status(409).json({
                    msg: "Oferta Coletiva ja cadastrada"
                })
            }

            console.log(req.body.ano)
            console.log(req.body.edicao)

            const oferta = await OfertaColetiva.create({
                ano: req.body.ano,
                edicao: req.body.edicao
            })

            return res.status(201).json(oferta)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const ofertas = await OfertaColetiva.findAll()

            return res.status(200).json(ofertas)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new ofertaColetivaController()