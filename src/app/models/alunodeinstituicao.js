import Sequelize, { Model } from 'sequelize'

class AlunoDeInstituicao extends Model {
    static init (sequelize) {
        super.init(
            {
                nDocumento: {
                    type: Sequelize.STRING,
                    primaryKey: true,
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
                    allowNull: false,
                    references: {
                        model: 'alunoisf',
                        key: 'login',
                        name: 'fk_login_alunodeinstituicao'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'alunoisfdeinstituicao',
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
}

export default AlunoDeInstituicao