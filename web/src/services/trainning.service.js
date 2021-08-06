import axios from "axios";

const trainningBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/modulos`;

const trainningInstance = axios.create({
  baseURL: trainningBaseUrl,
});

export function getTrainning(id) {
  return trainningInstance.get(id);
}

export function getAllTrainnings(user) {
  const filter = `${user.cpf ? '?cpf='+user.cpf  : '?cnpj='+user.cnpj}`;
  return trainningInstance.get(filter);
}

export function repplyComment(trainningModuleId, commentId, comment) {
  return trainningInstance.put(`/resposta-comentario?trainingModuleId=${trainningModuleId}&commentId=${commentId}`, comment);
}

export function addNewComment(trainningModuleId, comment) {
  return trainningInstance.put(`/comentario?trainingModuleId=${trainningModuleId}`, comment);
}

export async function putAttachments(trainningModuleId, attachments) {
  console.log(attachments)
  return await trainningInstance.put(`/anexo?trainingModuleId=${trainningModuleId}`,  attachments);
}