import Sequelize, { Model } from 'sequelize'

class ComprovanteProfessorInstituicao extends Model {
  static init(sequelize) {
    super.init(
      {
        login: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
        },
        idInstituicao: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        inicio: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          primaryKey: true,
          validate: {
            isBefore: {
              args: new Date().toISOString(), // Data atual no formato ISO
              msg: 'A data do evento deve ser anterior à data atual.',
            },
          }
        },
        termino: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          validate: {
              isAfterBegin(value) {
                  if(this.inicio > value) {
                      throw new Error('A data de termino nao pode ser anterior a data de inicio')
                  }
              }
          }
      },
        comprovante: {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'teacher_institution_register',
        indexes: [{
            name: 'primary_key',
            unique: true,
            using: 'BTREE',
            fields: [
                { name: 'login'},
                { name: 'idInstituicao'},
                { name: 'inicio'}
            ]
        }]
      }
    )

    return this
    
  }
}

export default ComprovanteProfessorInstituicao