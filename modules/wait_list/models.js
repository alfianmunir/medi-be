
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("wait_list", {
        wl_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        wl_pasien_id : {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        wl_status : {
            type: Sequelize.STRING,
            allowNull: false
        },
        wl_rm_id: {
            type: Sequelize.BIGINT, 
        }
    }, {timestamps: false});
    return Model;
};