import Sequelize, { Model } from 'sequelize'

class EditalCursoEspecializacao extends Model {
    static init (sequelize) {
        super.init(
            {
                ano: {
                    type: Sequelize.CHAR(4),
                    primaryKey: true
                },
                documento: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                link: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                listaAprovados: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'editalcursoespecializacao',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "ano" }
                    ]
                }]
            }
        )

        return this
        
    }
}

export default CoordenadorNacional