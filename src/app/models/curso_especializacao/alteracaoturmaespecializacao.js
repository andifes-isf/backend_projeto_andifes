import Sequelize, { Model } from 'sequelize'

class AlteracaoTurmaEspecializacao extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                  },
                idTurma: {
                    type: Sequelize.BIGINT,
                    primaryKey: true
                },
                dataModificacao: {
                    type: Sequelize.DATE,
                    primaryKey: true,
                    defaultValue: Sequelize.NOW
                },
                valorAnteriorNumeroVagas: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                valorAnteriorNumeroMinimoAlunos: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                valorPosteriorNumeroVagas: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                valorPosteriorNumeroMinimoAlunos: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'alteracaoturmaespecializacao',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "login" },
                        { name: "idTurma" },
                        { name: "dataModificacao" },
                        { name: "campoModificado" },
                        { name: "valorAnterior" }
                    ]
                }]
            }
        )

        return this
        
    }
}

export default AlteracaoTurmaEspecializacao