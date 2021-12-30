
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("pasien", {
        pasien_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        pasien_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        pasien_alamat : {
            type: Sequelize.STRING,
        },
        pasien_gender: {    
            type: Sequelize.STRING
        },
        pasien_umur : {
            type: Sequelize.INTEGER
        },
        pasien_alergi: {
            type: Sequelize.STRING
        },
        pasien_lastarrival: {
            type: Sequelize.STRING
        },
    }, {timestamps: true, paranoid: true});
    return Model;
};