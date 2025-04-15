import { get } from "../utils/requets";

export const fetchTopic = async () => {
  const result = await get("topics");
  return result;
};

export const getTopicDetails = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
};
