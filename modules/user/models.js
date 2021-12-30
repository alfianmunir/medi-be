
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("user", {
        user_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_role: {    
            type: Sequelize.STRING
        },
        user_email : {
            type: Sequelize.STRING
        },
        user_password: {
            type: Sequelize.STRING
        },
    }, {timestamps: false});
    return Model;
};