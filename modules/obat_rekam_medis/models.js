
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("obat_rekam_medis", {
        orm_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        orm_rm_id : {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        orm_obat_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        orm_obat_strip: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        orm_obat_harga: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        orm_fee_berobat: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        orm_total_harga: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        orm_date: {
            type: Sequelize.DATE
        }
    }, {
        createdAt   : 'orm_date',
        timestamps  : true,
      });
    return Model;
};