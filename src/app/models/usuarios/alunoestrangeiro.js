import Sequelize, { Model } from 'sequelize'

class AlunoEstrangeiro extends Model {
    static init (sequelize) {
        super.init(
            {
              login: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
              },
              home_country: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
              },
              register: {
                type: Sequelize.STRING,
                allowNull: false
              },
              type: {
                type: Sequelize.STRING,
                allowNull: false
              },
              code: {
                type: Sequelize.STRING,
                allowNull: false
              },
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'isfstudent_foreign',
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