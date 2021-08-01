import axios from "axios";

const companyInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export function registerPerson(data) {
    return companyInstance.post('/funcionario',
        {
            person: data
        });
}

export function registerCompany(data) {
    return companyInstance.post('/empresa',
        {
            company: data
        });
}

export function validateModule(moduleId, cnpj) {
    return companyInstance.put(`validacao?moduleId=${moduleId}&cnpj=${cnpj}`);
}
