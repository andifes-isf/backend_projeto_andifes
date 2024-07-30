import { Router } from "express"

import usuarioController from "./app/controllers/usuarioController"
import alunoIsFController from "./app/controllers/alunoIsFController"
import professorIsFController from "./app/controllers/professorIsFController"
import alunoDeInstituicaoController from "./app/controllers/alunoDeInstituicaoController"
import instituicaoEnsinoController from "./app/controllers/instituicaoEnsinoController"
import comprovanteAlunoInstituicaoController from "./app/controllers/comprovanteAlunoInstituicaoController"

const router = new Router()

router.get('/', (req, res) => {
    return res.status(200).json({msg: "Hello World"})
})

router.post('/usuario', usuarioController.post)

router.get('/usuario', usuarioController.get)

router.post('/aluno_isf', alunoIsFController.post)

router.get('/aluno_isf', alunoIsFController.get)

router.post('/aluno_deinstituicao', alunoDeInstituicaoController.post)

router.get('/aluno_deinstituicao', alunoDeInstituicaoController.get)

router.post('/instituicao_ensino', instituicaoEnsinoController.post)

router.post('/comprovante_aluno_instituicao', comprovanteAlunoInstituicaoController.post)

router.post('/professor_isf', professorIsFController.post)

router.get('/professor_isf', professorIsFController.get)

export default router