"use strict";Object.defineProperty(exports, "__esModule", {value: true});class nivelProeficiencia{
    constructor() {
        this.niveis = ['nenhum', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    }

    #getIndex(nivel) {
        const index = this.niveis.indexOf(nivel)
        if(index == -1) {
            throw new Error(`Nivel de proeficiencia ${nivel} nao existe`)
        }
        return index
    }

    distanciaEntreNiveis(nivelAluno, nivelCurso) {
        const indexAluno = this.#getIndex(nivelAluno)
        const indexCurso = this.#getIndex(nivelCurso)

        return indexAluno - indexCurso
    }
}

exports. default = nivelProeficiencia