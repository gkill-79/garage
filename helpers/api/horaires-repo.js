
import { db } from 'helpers/api';

export const horairesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Horaire.findAll();
}

async function getById(id) {
    return await db.Horaire.findByPk(id);
}

async function create(params) {
    const horaire = new db.Horaire(params);
    // save horaire
    await horaire.save();
}

async function update(id, params) {
    const horaire = await db.Horaire.findByPk(id);

    // validate
    if (!horaire) throw 'Horaire n&apos;existe pas';

    await horaire.save();
}

async function _delete(id) {
    const horaire = await db.Horaire.findByPk(id);
    if (!horaire) throw 'horaire introuvable';

    // delete horaire
    await horaire.destroy();
}