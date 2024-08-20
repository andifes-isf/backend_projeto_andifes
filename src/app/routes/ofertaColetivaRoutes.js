import { Router } from 'express'
import ofertaColetivaController from '../controllers/ofertaColetivaController'

const router = new Router()

router.post('/', ofertaColetivaController.post)

router.get('/', ofertaColetivaController.get)

export default router