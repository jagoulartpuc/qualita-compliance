import axios from "axios";

const companyBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/empresa`;

const companyInstance = axios.create({
    baseURL: companyBaseUrl,
});

export function getCompanyReports(cnpj) {
    return companyInstance.get(cnpj + "/denuncias");
}

export function validateModule(moduleId, cnpj) {
    return companyInstance.put(`validacao?moduleId=${moduleId}&cnpj=${cnpj}`);
}
