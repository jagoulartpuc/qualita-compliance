import axios from "axios";

const reportInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export function createReport(payload) {
  const newPayload = {
    category: payload.category,
    urgent: payload.urgent,
    description: payload.description,
    author: payload.user.name,
    cpf: payload.user.cpf,
    email: payload.user.email,
    phone: payload.user.phone,
    dates: [payload.date],
    envolvedPeople: payload.envolvedPeople,
  };
  return reportInstance.post("denuncia", newPayload);
}
