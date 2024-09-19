import { Router } from "express"
import materialCursistaController from "../../controllers/curso_especializacao/materialCursistaController"

const router = new Router()

router.get('/:login', materialCursistaController.getMateriaisDoCursista)

router.get('/', materialCursistaController.getMateriais)

export default router