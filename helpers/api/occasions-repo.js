
import { db } from 'helpers/api';

export const occasionsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getVarious,
};


async function getAll() {
    return await db.Occasion.findAll();
}

async function getById(id) {
    return await db.Occasion.findByPk(id);
}

async function create(params) {
    const occasion = new db.Occasion(params);
    // save horaire
    await occasion.save();
}

async function update(id, params) {
    const occasion = await db.Occasion.findByPk(id);

    // validate
    if (!occasion) throw 'Occasion n&apos;existe pas';

    await occasion.save();
}

async function _delete(id) {
    const occasion = await db.Occasion.findByPk(id);
    if (!occasion) throw 'occasion introuvable';

    // delete occasion
    await occasion.destroy();
}


async function getVarious() {
    return await db.Occasion.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
  }