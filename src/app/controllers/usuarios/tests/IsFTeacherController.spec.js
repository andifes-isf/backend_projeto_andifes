// Controllers
import IsFTeacherController from '../professorIsFController'

// Repository 
import IsFTeacherRepository from '../../../repositories/user/IsFTeacherRepository'
import InstitutionRepository from '../../../repositories/institution/InstitutionRepository'

// Utils
import httpStatus from '../../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'
import UserTypes from '../../../utils/userType/userTypes'

jest.mock('../../../repositories/user/IsFTeacherRepository')
jest.mock('../../../repositories/institution/InstitutionRepository')

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

    it("PostInstituicao: Should not permit creation for non-existing institution", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                language: "japones",
                level: "N5",
                document: "Documento"
            },
            params: {
                institutionId: 2
            }
        }

        InstitutionRepository.findByPk.mockResolvedValue(null)

        await controller.postInstituicao(req, res)

        expect(res.json.mock.calls[0][0].errorName).toEqual(ErrorType.NOT_FOUND)
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
    })

    it("PostInstituicao: Should not permit creation existing relationship", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                language: "japones",
                level: "N5",
                document: "Documento"
            },
            params: {
                institutionId: 2
            }
        }

        InstitutionRepository.findByPk.mockResolvedValue(true)
        IsFTeacherRepository.findOneDocument.mockResolvedValue(true)

        await controller.postInstituicao(req, res)

        expect(res.json.mock.calls[0][0].errorName).toEqual(ErrorType.DUPLICATE_ENTRY)
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
    })

    it("PostInstituicao: Should close current registration to add new one", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                start: "2022-02-02",
                document: "Documente"
            },
            params: {
                institutionId: 2
            }
        }

        const data = "2022-02-02"
        const registration = {
            termino: data
        }

        InstitutionRepository.findByPk.mockResolvedValue(true)
        IsFTeacherRepository.findOneDocument.mockResolvedValue(false)
        IsFTeacherRepository.findCurrentDocument.mockResolvedValue(registration)
        InstitutionRepository.save.mockResolvedValue()

        await controller.postInstituicao(req, res)

        expect(registration.termino > data).toBeTruthy()
        expect(res.json.mock.calls[0][0].error).toEqual(false)
        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED)
    })
})