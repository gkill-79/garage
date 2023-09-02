import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Services = servicesModel(sequelize);
    db.Occasion = occasionModel(sequelize);
    db.Horaire = horaireModel(sequelize);
    db.Commentaire = commentaireModel(sequelize);
    db.Contact = contactModel(sequelize);
    db.Services.belongsTo(db.User, { foreignKey: 'userId'})

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}

// sequelize models with schema definitions

function userModel(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        roles: { type: DataTypes.STRING, allowNull: false, defaultValue: 'User' }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}

function servicesModel(sequelize) {
    const attributes = {
        titre: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        prix: { type: DataTypes.FLOAT, allowNull: false },
    };


    return sequelize.define('Services', attributes);
}

function occasionModel(sequelize) {
    const attributes = {
        marque: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        prix: { type: DataTypes.INTEGER, allowNull: false },
        kilometre: { type: DataTypes.INTEGER, allowNull: false },
        place: { type: DataTypes.INTEGER, allowNull: false },
        carburant: { type: DataTypes.STRING, allowNull: false },
        annee: { type: DataTypes.STRING, allowNull: false },
        image1: { type: DataTypes.STRING, allowNull: false },
        image2: { type: DataTypes.STRING, allowNull: false },
        image3: { type: DataTypes.STRING, allowNull: false },
    };


    return sequelize.define('Services', attributes);
}


function horaireModel(sequelize) {
    const attributes = {
        jour: { type: DataTypes.STRING, allowNull: false },
        debut_am: { type: DataTypes.STRING, allowNull: true },
        fin_am: { type: DataTypes.STRING, allowNull: true },
        debut_pm: { type: DataTypes.STRING, allowNull: true },
        fin_pm: { type: DataTypes.STRING, allowNull: true },
        fermeture_am: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        fermeture_pm: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    };

    return sequelize.define('Horaire', attributes);
}


function commentaireModel(sequelize) {
    const attributes = {
        nom: { type: DataTypes.STRING, allowNull: false },
        commentaire: { type: DataTypes.TEXT, allowNull: false },
        note: { type: DataTypes.INTEGER, allowNull: false },
    };


    return sequelize.define('Commentaire', attributes);
}


function contactModel(sequelize) {
    const attributes = {
        nom: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        voiture_id: { type: DataTypes.INTEGER, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        telephone: { type: DataTypes.STRING, allowNull: true },
        vue: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
        action: { type: DataTypes.STRING, allowNull: true },
    };


    return sequelize.define('Contact', attributes);
}


