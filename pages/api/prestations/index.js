import { apiHandler, prestationsRepo } from "helpers/api";

export default apiHandler({
  get: getAll,
});

async function getAll(req, res) {
  const prestations = await prestationsRepo.getAll();
  return res.status(200).json(prestations);
}
