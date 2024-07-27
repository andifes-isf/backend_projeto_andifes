import { Router } from "express"

import usuarioController from "./app/controllers/usuarioController"

const router = new Router()

router.get('/', (req, res) => {
    return res.status(200).json({msg: "Hello World"})
})

router.post('/usuario', usuarioController.post)

export default router