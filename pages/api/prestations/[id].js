import { apiHandler, prestationsRepo } from "helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const prestation = await prestationsRepo.getById(req.query.id);

  if (!prestation) throw "prestation n&apos;existe pas";

  return res.status(200).json(prestation);
}

async function update(req, res) {
  await prestationsRepo.update(req.query.id, req.body);
  return res.status(200).json({});
}

async function _delete(req, res) {
  await prestationsRepo.delete(req.query.id);
  return res.status(200).json({});
}
