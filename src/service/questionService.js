import { del, get, patch, post } from "../utils/requets";

export const fetchQuestion = async (topicId) => {
  const result = get(`questions?topicId=${topicId}`);
  return result;
};

export const addQuizAnswer = async function (options) {
  //Add
  const res = await post("questions", options);
  return res;
};

export const updateAnswerQuiz = async function (id, options) {
  const result = await patch("questions/" + id, options);
  return result;
};

export const deleteQuiz = async function (id) {
  const result = await del("questions", id);
  return result;
};
