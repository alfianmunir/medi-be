
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("pengaturan", {
        pengaturan_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        pengaturan_key : {
            type: Sequelize.STRING,
            allowNull: false
        },
        pengaturan_value: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {timestamps: false});
    return Model;
};