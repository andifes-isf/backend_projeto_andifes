// Controllers
import SpecializationStudentController from '../cursistaEspecializacaoController'

// Repository
import SpecializationStudentRepository from '../../../repositories/usuarios/SpecializationStudentRepository'
import PracticalReportRepository from '../../../repositories/specialization_course/PracticalReportRepository'
import NotificationRepository from '../../../repositories/utils/NotificationRepository'
import SpecializationDisciplineClassRepository from '../../../repositories/specialization_course/SpecializationDisciplineClassRepository'

// Utils
import httpStatus from '../../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../../utils/response/messages/messages_pt'
import ErrorType from '../../../utils/response/ErrorType/ErrorType'
import UserTypes from '../../../utils/userType/userTypes'

jest.mock('../../../repositories/usuarios/SpecializationStudentRepository')
jest.mock('../../../repositories/specialization_course/PracticalReportRepository')
jest.mock('../../../repositories/utils/NotificationRepository')
jest.mock('../../../repositories/specialization_course/SpecializationDisciplineClassRepository')

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('SPECIALIZATION STUDENT', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Post: should not permit creation if login is existing", async () => {
        const login = "Ademir"

        const req = {
            body: {
                login: login
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        SpecializationStudentRepository.findByPk.mockResolvedValue({
            login: login
        })

        await SpecializationStudentController.post(req, res)

        expect(SpecializationStudentRepository.findByPk).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.EXISTING_SPECIALIZATION_STUDENT + login,
            errorName: ErrorType.DUPLICATE_ENTRY
        })
    })

    it("postPracticalReport: should not permit access to PostPracticalReport", async () => {
        const req = {
            tipoUsuario: "teste"
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await SpecializationStudentController.postPracticalReport(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.UNAUTHORIZED)
    })

    it("postPracticalReport: Should not create a existing PracticalReport", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                name: "Teste"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PracticalReportRepository.findOne.mockResolvedValue(true)

        await SpecializationStudentController.postPracticalReport(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.EXISTING_PRACTICAL_REPORT,
            errorName: ErrorType.DUPLICATE_ENTRY
        })
    })

    it("postPracticalReport: Should return error if language is not defined", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                name: "Teste",
                language: "teste"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PracticalReportRepository.findOne.mockResolvedValue(false)
        SpecializationStudentRepository.createReport.mockResolvedValue(true)
        SpecializationStudentRepository.findByPk.mockResolvedValue({})
        SpecializationStudentRepository.getAdvisor.mockResolvedValue([{
            login: "Yugo"
        }])

        await SpecializationStudentController.postPracticalReport(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.LANGUAGE_NOT_FOUND,
            errorName: ErrorType.NOT_FOUND
        })
    })

    it("postPracticalReport: Should call notification.create at least once", async () => {
        const req = {
            loginUsuario: "Kactus",
            tipoUsuario: UserTypes.CURSISTA,
            body: {
                name: "Teste",
                language: "japones"
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        PracticalReportRepository.findOne.mockResolvedValue(false)
        SpecializationStudentRepository.createReport.mockResolvedValue(true)
        SpecializationStudentRepository.findByPk.mockResolvedValue({})
        SpecializationStudentRepository.getAdvisor.mockResolvedValue([{
            login: "Yugo"
        }])
        NotificationRepository.create.mockResolvedValue({})

        await SpecializationStudentController.postPracticalReport(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED)
        expect(NotificationRepository.create).toHaveBeenCalledTimes(1)
    })

    it("getMaterial: Should return error if material doesn't exists", async () => {
        const req = {
            tipoUsuario: "cursista",
            loginUsuario: "Kactus",
            params: {
                nome: 'teste'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        SpecializationStudentRepository.getMaterial.mockResolvedValue([])
        await SpecializationStudentController.getMaterial(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
    })

    it("getMaterial: Should set visualizado_pelo_cursista to true if material.data_avaliacao is null", async () => {
        const req = {
            tipoUsuario: "cursista",
            loginUsuario: "Kactus",
            params: {
                nome: 'teste'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const material = [{
            data_avaliacao: 1,
            visualizado_pelo_cursista: false,
            save: jest.fn().mockResolvedValue()
        }]

        SpecializationStudentRepository.getMaterial.mockResolvedValue(material)
        await SpecializationStudentController.getMaterial(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.SUCCESS)
        expect(material[0].save).toHaveBeenCalledTimes(1)
        expect(material[0].visualizado_pelo_cursista).toBeTruthy()
    })

    it("postCursaTurma: Shoul return error if class does'nt exists", async () => {
        const req = {
            tipoUsuario: "cursista",
            loginUsuario: "Kactus",
            params: {
                nome_turma: 'teste'
            }
        }

        SpecializationStudentRepository.findByPk.mockResolvedValue()
        SpecializationDisciplineClassRepository.findByPk.mockResolvedValue()
        await SpecializationStudentController.postCursaTurma(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.CLASS_NOT_FOUND + req.params.nome_turma,
            errorName: ErrorType.NOT_FOUND
        })
    })

    it("postCursaTurma: Shoul return error if student is already in this class", async () => {
        const req = {
            tipoUsuario: "cursista",
            loginUsuario: "Kactus",
            params: {
                nome_turma: 'teste'
            }
        }

        SpecializationStudentRepository.findByPk.mockResolvedValue()
        SpecializationDisciplineClassRepository.findByPk.mockResolvedValue({})
        SpecializationStudentRepository.isInClass.mockResolvedValue(true)
        await SpecializationStudentController.postCursaTurma(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST)
        expect(res.json).toHaveBeenCalledWith({
            error: true,
            message: MESSAGES.EXISTING_CLASS_SPECIALIZATIONSTUDENT_RELATIONSHIP,
            errorName: ErrorType.DUPLICATE_ENTRY
        })
    })

    it("postCursaTurma: Should create successfully an relationship", async () => {
        const req = {
            tipoUsuario: "cursista",
            loginUsuario: "Kactus",
            params: {
                nome_turma: 'teste'
            }
        }

        SpecializationStudentRepository.findByPk.mockResolvedValue()
        SpecializationDisciplineClassRepository.findByPk.mockResolvedValue({})
        SpecializationStudentRepository.isInClass.mockResolvedValue(false)
        SpecializationStudentRepository.addClass.mockResolvedValue()
        SpecializationStudentRepository.getClasses.mockResolvedValue()
        await SpecializationStudentController.postCursaTurma(req, res)

        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED)
    })

    it("postInteresseNaDiscipline", async () => {
        const req = {
            
        }
    })


})