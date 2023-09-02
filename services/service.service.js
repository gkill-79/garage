import getConfig from 'next/config';


import { fetchWrapper } from 'helpers';

// methode fetch avec endpoints API pour le crud  des services
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/services`;


export const serviceService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getVarious,
};


async function register(service) {
    await fetchWrapper.post(`${baseUrl}/register`, service);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

}

async function getVarious() {
    return await fetchWrapper.get(`${baseUrl}/various`)
}
