import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth'
import MESSAGES from '../utils/messages/messages_pt'
import CustomError from '../utils/CustomError/CustomError'
import httpStatus from '../utils/httpStatus/httpStatus'

export default async(req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        throw new CustomError(MESSAGES.LOGIN_NECESSARY, httpStatus.UNAUTHORIZED)
    }

    // Desestruturação de vetor (Bearer, ...token)
    const [, token] = authorization.split(' ')

    try {
        const{ login, tipo } = await promisify(jwt.verify)(token, authConfig.secret)

        req.loginUsuario = login
        req.tipoUsuario = tipo
    } catch (error) {
        throw new CustomError(MESSAGES.ACCESS_DENIED, httpStatus.UNAUTHORIZED)
    }

    return next()

}