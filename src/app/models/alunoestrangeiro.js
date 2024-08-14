import Sequelize, { Model } from 'sequelize'

class AlunoEstrangeiro extends Model {
    static init (sequelize) {
        super.init(
            {
              login: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'alunoisf',
                    key: 'login',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
              },
              paisOrigem: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
              },
              comprovante: {
                type: Sequelize.STRING,
                allowNull: false
              },
              tipo: {
                type: Sequelize.STRING,
                allowNull: false
              },
              codigo: {
                type: Sequelize.STRING,
                allowNull: false
              },
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'alunoisfestrangeiro',
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
    }

}

export default AlunoEstrangeiro