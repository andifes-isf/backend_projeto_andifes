import { Router } from "express"
import usuarioRoutes from './usuarioRoutes'
import professorIsFRoutes from './professorIsFRoutes'
import instituicaoEnsinoRoutes from './instituicaoEnsinoRoutes'
import cursoRoutes from './cursoRoutes'
import comprovanteAlunoInstituicaoRoutes from './comprovanteAlunoInstituicaoRoutes'
import alunoIsFRoutes from './alunoIsFRoutes'
import alunoDeInstituicaoRoutes from './alunoDeInstituicaoRoutes'
import turmaOCRoutes from './turmaOCRoutes'

const router = new Router()

router.use('/usuario', usuarioRoutes)
router.use('/professor_isf', professorIsFRoutes)
router.use('/instituicao_ensino', instituicaoEnsinoRoutes)
router.use('/curso', cursoRoutes)
router.use('/comprovante_aluno_instituicao', comprovanteAlunoInstituicaoRoutes)
router.use('/aluno_isf', alunoIsFRoutes)
router.use('/aluno_deinstituicao', alunoDeInstituicaoRoutes)
router.use('/turma_oc', turmaOCRoutes)

export default router