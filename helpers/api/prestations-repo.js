import { db } from "helpers/api";

export const prestationsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getVarious,
};

async function getAll() {
  return await db.Prestation.findAll();
}

async function getById(id) {
  return await db.Prestation.findByPk(id);
}

async function create(params) {
  const prestation = new db.Prestation(params);
  // save prestation
  await prestation.save();
}

async function update(id, params) {
  const prestation = await db.Prestation.findByPk(id);

  // validate
  if (!prestation) throw "prestation n&apos;existe pas";
  Object.assign(prestation, params);
  await prestation.save();
}

async function _delete(id) {
  const prestation = await db.Prestation.findByPk(id);
  if (!prestation) throw "prestation introuvable";

  // delete prestation
  await prestation.destroy();
}

async function getVarious() {
  return await db.Prestation.findAll({
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
}
