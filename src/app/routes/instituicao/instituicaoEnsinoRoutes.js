import { Router } from "express"
import instituicaoEnsinoController from "../../controllers/instituicao/instituicaoEnsinoController"

const router = new Router()

router.get('/', instituicaoEnsinoController.get)

export default router