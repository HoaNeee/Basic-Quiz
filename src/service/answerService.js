import { get, patch, post } from "../utils/requets";

//http://localhost:3002/answers?userId=1&topicId=2
export const fetchAnswerUser = async (userId) => {
  const result = get(`answers?userId=${userId}`);
  return result;
};

export const fetchAnswerDetail = async (id) => {
  const result = get("answers/" + id);
  return result;
};

export const addAnswersUser = async (option) => {
  const result = post("answers", option);
  return result;
};
