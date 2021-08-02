import axios from "axios";

const adminInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export async function createPerson(data) {
    return await adminInstance.post('/funcionario', data);
}

export async function createCompany(data) {
    return await adminInstance.post('/empresa', data);
}

export async function readCompany() {
    return await adminInstance.get('/empresa');
}

export async function readPerson() {
    return await adminInstance.get('/funcionario');
}

export async function readCompanyByCnpj(cnpj) {
    return await adminInstance.get('/empresa/' + cnpj);
}

export async function readPersonByCpf(cpf) {
    return await adminInstance.get('/funcionario/' + cpf);
}

export async function deleteCompany(cnpj) {
    return await adminInstance.delete('/empresa/' + cnpj);
}

export async function deletePerson(cpf) {
    return await adminInstance.delete('/funcionario/' + cpf);
}

export async function updateCompany(data) {
    return await adminInstance.put(`/empresa/${data.cnpj}`, data);
}

export async function updatePerson(data) {
    return await adminInstance.put(`/funcionario/${data.cnpj}`, data);
}

export function validateModule(moduleId, cnpj) {
    return adminInstance.put(`validacao?moduleId=${moduleId}&cnpj=${cnpj}`);
}
