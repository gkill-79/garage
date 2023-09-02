import { apiHandler, servicesRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const services = await servicesRepo.getAll();
    return res.status(200).json(services);
}
