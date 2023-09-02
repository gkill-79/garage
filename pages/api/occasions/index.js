import { apiHandler, occasionsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const occasions = await occasionsRepo.getAll();
    return res.status(200).json(occasions);
}
