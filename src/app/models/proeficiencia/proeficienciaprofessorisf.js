import Sequelize, { Model } from 'sequelize'

class ProeficienciaProfessorIsF extends Model {
  static init(sequelize) {
    super.init(
      {
        login: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        idioma: {
          type: Sequelize.ENUM('ingles', 'portugues', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
          primaryKey: true
        },
        nivel: {
          type: Sequelize.CHAR(2),
          primaryKey: true
        },
        comprovante: {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        updatedAt: false,
        tableName: 'isfteacher_proeficiency',
        indexes: [{
            name: 'primary_key',
            unique: true,
            using: 'BTREE',
            fields: [
                { name: 'login'},
                { name: 'idioma'},
                { name: 'nivel'}
            ]
        }]
      }
    )

    return this
    
  }

  static associate(models) {
    this.belongsTo(models.ProfessorIsF, {
      foreignKey: 'login'
    })
  }

}

export default ProeficienciaProfessorIsF