import { apiHandler, prestationsRepo } from "helpers/api";

export default apiHandler({
  post: register,
});

async function register(req, res) {
  await prestationsRepo.create(req.body);
  return res.status(200).json({});
}
