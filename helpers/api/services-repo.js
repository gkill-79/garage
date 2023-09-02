
import { db } from 'helpers/api';

export const servicesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getVarious,
};


async function getAll() {
    return await db.Service.findAll();
}

async function getById(id) {
    return await db.Service.findByPk(id);
}

async function create(params) {
    const service = new db.Service(params);
    // save service
    await service.save();
}

async function update(id, params) {
    const service = await db.Service.findByPk(id);

    // validate
    if (!service) throw 'Service n&apos;existe pas';
    Object.assign(service, params)
    await service.save();
}

async function _delete(id) {
    const service = await db.Service.findByPk(id);
    if (!service) throw 'service introuvable';

    // delete service
    await service.destroy();
}


async function getVarious() {
    return await db.Service.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
  }