import { apiHandler, occasionsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const occasion = await occasionsRepo.getById(req.query.id);

    if (!occasion) throw 'Cette occasion n&apos;existe pas';

    return res.status(200).json(occasion);
}

async function update(req, res) {
    await occasionsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await occasionsRepo.delete(req.query.id);
    return res.status(200).json({});
}
