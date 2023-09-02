import { apiHandler, servicesRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await servicesRepo.create(req.body);
    return res.status(200).json({});
}
