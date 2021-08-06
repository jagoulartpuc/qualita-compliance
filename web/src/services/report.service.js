import axios from "axios";

const reportBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/denuncia`;

const reportInstance = axios.create({
  baseURL: reportBaseUrl,
});

export function createReport(payload) {
  const newPayload = {
    category: payload.category,
    companyName: payload.companyName,
    urgent: payload.urgency,
    description: payload.description,
    author: payload.user?.name,
    cpf: payload.user?.cpf,
    email: payload.user?.email,
    phone: payload.user?.phone,
    dates: payload.dates,
    reportDetails: payload.reportDetails,
    local: payload.local,
    attachments: payload.attachments,
    isManagerKnowledge: payload.isManagerKnowledge,
    caseKnowledge: String(payload.isManagerKnowledge),
  };
  return reportInstance.post("", newPayload);
}

export function getReport(id) {
  return reportInstance.get(id);
}

export function deleteReport(id) {
  return reportInstance.delete(id);
}

export function getReports() {
  return reportInstance.get();
}
