import { Router } from "express"
import turmaOCController from "../controllers/turmaOCController"

const router = new Router()

router.post('/', turmaOCController.post)

router.get('/', turmaOCController.get)

export default router