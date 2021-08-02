import axios from "axios";

const adminInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export function createPerson(data) {
    return adminInstance.post('/funcionario', data);
}

export function createCompany(data) {
    return adminInstance.post('/empresa', data);
}

export function validateModule(moduleId, cnpj) {
    return adminInstance.put(`validacao?moduleId=${moduleId}&cnpj=${cnpj}`);
}
