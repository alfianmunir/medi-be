
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("obat", {
        obat_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        obat_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        obat_harga: {    
            type: Sequelize.STRING
        },
        obat_stok : {
            type: Sequelize.INTEGER
        },
        obat_kandungan: {
            type: Sequelize.STRING
        },
    }, {timestamps: true, paranoid: true});
    return Model;
};