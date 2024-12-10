/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guidance_report', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      workload: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      note: {
        type: Sequelize.STRING
      } ,
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      report_type: {
        type: Sequelize.ENUM('advisor_teacher', 'specialization_student'),
        allowNull: false
      }
    })

    await queryInterface.addConstraint('guidance_report', {
      fields: ['login', 'created_at'],
      type: 'unique',
      name: 'unique_login_createdat_guidancereport'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('guidance_report')
  }
};
