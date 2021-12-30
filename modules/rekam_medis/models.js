
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("rekam_medis", {
        rm_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        rm_pasien_id: {
            type: Sequelize.BIGINT,  
            allowNull: false
        },
        rm_date : {
            type: Sequelize.DATE,
            allowNull: false
        },
        rm_temp: {
            type: Sequelize.STRING,
        },
        rm_tensi: {
            type: Sequelize.STRING,
        },
        rm_gula_darah: {
            type: Sequelize.STRING,
        },
        rm_kolesterol: {
            type: Sequelize.STRING,
        },
        rm_asam_urat: {
            type: Sequelize.STRING,
        },
        rm_anamnesa: {
            type: Sequelize.STRING, 
        },
        rm_diagnosa: {
            type: Sequelize.STRING, 
        },
        rm_fee_berobat: {
            type: Sequelize.DOUBLE
        }
    }, {
        createdAt   : 'rm_date',
        timestamps  : true,
        paranoid: true
      });
    return Model;
};