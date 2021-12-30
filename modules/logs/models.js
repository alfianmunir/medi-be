
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("logs", {
        log_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        log_src : {
            type: Sequelize.STRING,
            allowNull: false
        },
        log_title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        log_subtitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        log_date: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {timestamps: false});
    return Model;
};