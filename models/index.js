const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true
        }
    },
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.pasien = require('../modules/pasien/models')(sequelize, Sequelize)
db.obat = require('../modules/obat/models')(sequelize, Sequelize)
db.user = require('../modules/user/models')(sequelize, Sequelize)
db.pengaturan = require('../modules/pengaturan/models')(sequelize, Sequelize)
db.rekam_medis = require('../modules/rekam_medis/models')(sequelize, Sequelize)
db.obat_rekam_medis = require('../modules/obat_rekam_medis/models')(sequelize, Sequelize)
db.wait_list = require('../modules/wait_list/models')(sequelize, Sequelize)
db.logs = require('../modules/logs/models')(sequelize, Sequelize)

db.wait_list.belongsTo(db.pasien, {
    foreignKey: 'wl_pasien_id',
    targetKey:  'pasien_id'
})

db.rekam_medis.belongsTo(db.pasien, {
    foreignKey: 'rm_pasien_id',
    targetKey:  'pasien_id'
})

db.wait_list.belongsTo(db.rekam_medis, {
    foreignKey: 'wl_rm_id',
    targetKey:  'rm_id'
})

db.pasien.hasMany(db.rekam_medis, {
    foreignKey: 'rm_pasien_id',
    targetKey:  'pasien_id'
})

db.wait_list.hasMany(db.rekam_medis, {
    foreignKey: 'rm_pasien_id',
    targetKey:  'wl_pasien_id'
})

db.rekam_medis.belongsToMany(db.obat, {
    through: 'obat_rekam_medis',
    foreignKey: 'orm_rm_id',  
    otherKey: 'orm_obat_id' 
})

db.obat.belongsToMany(db.rekam_medis, {
    through: 'obat_rekam_medis',
    foreignKey: 'orm_obat_id',  
    otherKey: 'orm_rm_id' 
})

module.exports = db;