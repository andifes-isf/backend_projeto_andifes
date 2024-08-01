import { Router } from "express"
import instituicaoEnsinoController from "../controllers/instituicaoEnsinoController"

const router = new Router()

router.post('/', instituicaoEnsinoController.post)

router.get('/', instituicaoEnsinoController.get)

export default router