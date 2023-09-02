import { apiHandler, servicesRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const service = await servicesRepo.getById(req.query.id);

    if (!service) throw 'service n&apos;existe pas';

    return res.status(200).json(service);
}

async function update(req, res) {
    await servicesRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await servicesRepo.delete(req.query.id);
    return res.status(200).json({});
}
