import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth'

export default async(req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({
            error: 'E preciso estar logado para acessar essa pagina'
        })
    }

    // Desestruturação de vetor (Bearer, ...token)
    const [, token] = authorization.split(' ')

    try {
        const{ login, tipo } = await promisify(jwt.verify)(token, authConfig.secret)

        req.loginUsuario = login
        req.tipoUsuario = tipo
    } catch (error) {
        return res.status(401).json({
            error: 'Token de acesso inválido'
        })
    }

    return next()

}