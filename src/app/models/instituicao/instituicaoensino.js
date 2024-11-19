import Sequelize, { Model } from 'sequelize'

class InstituicaoEnsino extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    unique: true
                },
                documentoVinculo: Sequelize.TEXT,
                brasileira: Sequelize.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicao_ensino',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'idInstituicao' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models) {
        this.belongsToMany(models.AlunoDeInstituicao, {
            through: 'comprovante_aluno_instituicao',
            foreignKey: 'idInstituicao',
            targetKey: 'login',
            timestamps: false
        })

        this.belongsToMany(models.ProfessorIsF, {
            through: 'comprovanteprofessorinstituicao',
            foreignKey: 'idInstituicao',
            sourceKey: 'idInstituicao',
            timestamps: false
        })

        this.hasOne(models.InstituicaoEnsinoBrasileira, {
            foreignKey: 'idInstituicao'
        })

        this.hasOne(models.InstituicaoEnsinoEstrangeira, {
            foreignKey: 'idInstituicao'
        })
    }

}

export default InstituicaoEnsino