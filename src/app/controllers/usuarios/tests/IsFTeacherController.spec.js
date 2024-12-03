// Controllers
import IsFTeacherController from '../professorIsFController'

// Repository 
import IsFTeacherRepository from '../../../repositories/usuarios/IsFTeacherRepository'

// Utils
import httpStatus from '../../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'
import UserTypes from '../../../utils/userType/userTypes'

jest.mock('../../../repositories/usuarios/IsFTeacherRepository')

const controller = new IsFTeacherController()

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('ISF TEACHER', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("PostProeficiencia: Should not permit creation of existing proeficiency", async () => {
        const req = {
            tipoUsuario: "cursista",
            body: {
                language: "japones",
                level: "N5",
                document: "Documento"
            }
        }

        IsFTeacherRepository.verifyExistingProeficiency.mockResolvedValue(true)

        await controller.postProeficiencia(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
    })

    it("PostProeficiencia: Should allow creation for specialization_student", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                language: "japones",
                level: "N5",
                document: "Documento"
            }
        }

        IsFTeacherRepository.verifyExistingProeficiency.mockResolvedValue(false)
        IsFTeacherRepository.createProeficiency.mockResolvedValue(true)

        await controller.postProeficiencia(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED)
    })

    it("PostProeficiencia: Should allow creation for graduation_student", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.ISF_TEACHER,
            body: {
                language: "japones",
                level: "N5",
                document: "Documento"
            }
        }

        IsFTeacherRepository.verifyExistingProeficiency.mockResolvedValue(false)
        IsFTeacherRepository.createProeficiency.mockResolvedValue(true)

        await controller.postProeficiencia(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED)
    })
})