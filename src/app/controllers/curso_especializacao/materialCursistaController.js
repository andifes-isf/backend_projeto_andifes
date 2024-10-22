// import * as Yup from 'yup'
// import MaterialCursista from '../../models/curso_especializacao/materialcursista'
// import CursistaEspecializacao from '../../models/usuarios/cursistaespecializacao'

// class materialCursistaController {
//     async getMateriais(_, res){
//         try {
//             const materiais = await MaterialCursista.findAll()

//             return res.status(200).json(materiais)
//         } catch (error) {
//             return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
//         }
//     }

//     async getMateriaisDoCursista(req, res){
//         try {
//             // Verifica se o login passado é de um cursista
//             const cursista = await CursistaEspecializacao.count({
//                 where: {
//                     login: req.params.login
//                 }
//             })

//             if(cursista === 0){
//                 return res.status(422).json({
//                     msg: 'Cursista nao encontrado'
//                 })
//             }


//             const materiais = await MaterialCursista.findAll({
//                 where: {
//                     login: req.params.login
//                 }
//             })

//             return res.status(200).json(materiais)
//         } catch (error) {
//             return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
//         }
//     }
// }

// export default new materialCursistaController()