import { apiHandler, occasionsRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await occasionsRepo.create(req.body);
    return res.status(200).json({});
}
