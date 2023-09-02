import { apiHandler, horairesRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const horaires = await horairesRepo.getAll();
    return res.status(200).json(horaires);
}
