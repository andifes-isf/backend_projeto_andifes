import { Router } from "express"
import instituicaoEnsinoController from "../../controllers/instituicao/instituicaoEnsinoController"

const router = new Router()

router.get('/', instituicaoEnsinoController.get)

router.get('/:id', instituicaoEnsinoController.getById);

export default router