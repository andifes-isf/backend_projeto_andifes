import Sequelize, { Model } from 'sequelize'

class AlunoDeInstituicao extends Model {
    static init (sequelize) {
        super.init(
            {
                nDocumento: {
                    type: Sequelize.STRING,
                    unique: true
                },
                cargo: {
                    type: Sequelize.INTEGER,
                },
                areaAtuacao: {
                    type: Sequelize.ENUM('ciencias exatas e da terra','ciencias biologicas','engenharia/tecnologia','ciencias da saude','ciencias agrarias','ciencias sociais','ciencias humanas','linguistica','letras e artes', 'prefiro nao dizer'),
                    allowNull: false
                },
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                }
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'aluno_isf_instituicao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' }
                    ]
                }]
            }
        )
        
        return this

    }

    static associate(models) {
        this.belongsTo(models.AlunoIsF, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.InstituicaoEnsino, {
            through: 'comprovante_aluno_instituicao',
            foreignKey: 'login',
            sourceKey: 'login',
            timestamps: false,
            as: "institution"
        })
    }

}

export default AlunoDeInstituicao