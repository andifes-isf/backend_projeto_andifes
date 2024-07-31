import { Router } from "express"
import instituicaoEnsinoController from "../controllers/instituicaoEnsinoController"

const router = new Router()

router.post('/', instituicaoEnsinoController.post)

export default router