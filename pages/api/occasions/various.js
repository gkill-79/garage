import { apiHandler, occasionsRepo } from 'helpers/api';

export default apiHandler({
    get: getVarious
});

async function getVarious(req, res) {
    const occasions = await occasionsRepo.getVarious();
    return res.status(200).json(occasions);
}
