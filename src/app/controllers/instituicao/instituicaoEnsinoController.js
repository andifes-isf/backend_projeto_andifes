import * as Yup from 'yup'

// Models
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import InstituicaoEnsinoEstrangeira from '../../models/instituicao/instituicaoensinoestrangeira'
import InstituicaoEnsinoBrasileira from '../../models/instituicao/instituicaoensinobrasileira'

// Utils
import { Op } from 'sequelize'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from '../../utils/response/CustomError/CustomError'
import httpStatus from '../../utils/response/httpStatus/httpStatus'

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        const existingInstitution = await InstituicaoEnsino.findOne({
            where: {
                [Op.or]: [{nome: req.body.nome}, {documentoVinculo: req.body.documentoVinculo}]
            }
        })

        if(existingInstitution) {
            throw new CustomError(`"${existingInstitution.nome}" ou "${existingInstitution.documentoVinculo}"` + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }

        let acronymRegistered

        if (brasileira == 1) {
            acronymRegistered = ( await InstituicaoEnsinoBrasileira.findOne({
                where: {
                    [Op.or]: [{sigla: req.body.sigla}, {CNPJ: req.body.CNPJ}]
                }
            }) ) !== null
        } else {
            acronymRegistered = ( await InstituicaoEnsinoEstrangeira.findOne({
                where: {
                    sigla: req.body.sigla
                }
            }) ) !== null
        }

        if(acronymRegistered) {
            throw new CustomError(`${req.body.sigla} ${brasileira == 1 ? `ou ${req.body.CNPJ}` : ""}` + MESSAGES.EXISTING_ACRONYM, httpStatus.BAD_REQUEST)
        }


        return await InstituicaoEnsino.create({
            nome: req.body.nome,
            documentoVinculo: req.body.documentoVinculo,
            brasileira: brasileira
        })
    }

    async get(_, res) {
        const institutions = await InstituicaoEnsino.findAll()

        return res.status(httpStatus.SUCCESS).json(institutions)
    }

    async getById(req, res) {
        try {
          const { id } = req.params;
      
          const instituicao = await InstituicaoEnsino.findOne({
            where: { idInstituicao: id },
            attributes: ["idInstituicao", "nome", "brasileira", "documentoVinculo"],
            include: [
              {
                model: InstituicaoEnsinoBrasileira, // Modelo sem alias explícito
                attributes: ["sigla", "CNPJ"],
              },
              {
                model: InstituicaoEnsinoEstrangeira, // Modelo sem alias explícito
                attributes: ["sigla", "pais"],
              },
            ],
          });
      
          if (!instituicao) {
            return res.status(404).json({
              error: true,
              message: "Instituição não encontrada.",
            });
          }
      
          return res.status(200).json({
            error: false,
            instituicao,
          });
        } catch (error) {
          console.error("Erro ao buscar instituição por ID:", error);
          return res.status(500).json({
            error: true,
            message: "Erro ao buscar instituição.",
          });
        }
      }
}

export default new instituicaoEnsinoController()