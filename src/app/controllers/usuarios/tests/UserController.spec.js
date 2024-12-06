// Controller
import UserController from '../usuarioController'

// Repository
import UserRepository from '../../../repositories/user/UserRepository'

// Utils
import httpStatus from '../../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'
import UserTypes from '../../../utils/userType/userTypes'

jest.mock('../../../repositories/user/UserRepository')

const controller = new UserController()

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('USER', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("getNotification: Should return error if tries to get an unexisting notification", async () => {
        const req = {
            params: {
                idNotificacao: 1
            },
            loginUsuario: "Arata"
        }

        UserRepository.getNotification.mockResolvedValue({
            length: 0
        })

        await controller.getNotificacao(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json.mock.calls[0][0].errorName).toEqual(ErrorType.NOT_FOUND)

    })
})