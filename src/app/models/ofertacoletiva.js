import Sequelize, { Model } from 'sequelize';

class OfertaColetiva extends Model {
    static init(sequelize) {
        super.init({
            ano: {
                type: Sequelize.INTEGER,
                primaryKey: true    
            },
            edicao: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            codigo: Sequelize.STRING
        },
        {
            sequelize,
            tableName: 'ofertacoletiva',
            timestamps: false,
            indexes: [{
                name: 'primary_key',
                unique: true,
                using: 'BTREE',
                fields: [
                    { name: 'ano' },
                    { name: 'edicao' }
                ]
            }]
        });

        // Hook para gerar o código antes de salvar
        this.addHook('beforeSave', async (oferta) => {
            oferta.codigo = `${oferta.ano}_${oferta.edicao}`;
        });

        return this;
    }
}

export default OfertaColetiva;
