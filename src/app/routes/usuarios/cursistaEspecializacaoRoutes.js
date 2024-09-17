import { Router } from "express"
import cursistaEspecializacaoController from "../../controllers/usuarios/cursistaEspecializacaoController"

const router = new Router()

router.post('/', cursistaEspecializacaoController.post)

router.get('/', cursistaEspecializacaoController.get)

router.post('/inserir_material', cursistaEspecializacaoController.postMaterial)

router.get('/visualizar_materiais/:login', cursistaEspecializacaoController.getMateriaisDoCursista)

router.get('/visualizar_materiais', cursistaEspecializacaoController.getMateriais)

export default router