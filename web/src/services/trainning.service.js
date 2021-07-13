import axios from "axios";

const trainningBaseUrl = `${process.env.REACT_APP_API_BASE_URL}/modulos`;

const trainningInstance = axios.create({
  baseURL: trainningBaseUrl,
});

export function getTrainning(id) {
  return trainningInstance.get(id);
}

export function getAllTrainnings() {
  return trainningInstance.get('');
}

export function repplyComment(trainningModuleId, commentId, comment) {
  return trainningInstance.put(`/resposta-comentario?trainingModuleId=${trainningModuleId}&commentId=${commentId}`, comment);
}

export function addNewComment(trainningModuleId, comment) {
  return trainningInstance.put(`/comentario?trainingModuleId=${trainningModuleId}`, comment);
}