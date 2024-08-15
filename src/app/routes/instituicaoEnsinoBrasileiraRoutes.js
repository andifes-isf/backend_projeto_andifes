import { Router } from "express"
import instituicaoEnsinoBrasileiraController from "../controllers/instituicaoEnsinoBrasileiraController"

const router = new Router()

router.post('/', instituicaoEnsinoBrasileiraController.post)

router.get('/', instituicaoEnsinoBrasileiraController.get)

export default router