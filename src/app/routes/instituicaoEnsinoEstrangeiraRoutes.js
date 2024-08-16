import { Router } from "express"
import instituicaoEnsinoEstrangeiraController from "../controllers/instituicaoEnsinoEstrangeiraController"

const router = new Router()

router.post('/', instituicaoEnsinoEstrangeiraController.post)

router.get('/', instituicaoEnsinoEstrangeiraController.get)

export default router