import { useEffect, useState } from "react";
import { fetchTopic } from "../../service/topicService";
import "./topic.scss";
import TopicItem from "../../components/topic/topicItem";
import { useDispatch, useSelector } from "react-redux";
import { addTopic } from "../../redux/topicSlice";
import { setUserAuto } from "../../utils/setUserAuto";

function Topics() {
  const topics = useSelector((state) => state.topic.topics);
  const dispatch = useDispatch();
  useEffect(() => {
    if (topics.length <= 0) {
      const fetchTopics = async function () {
        const response = await fetchTopic();
        dispatch(addTopic(response));
      };
      fetchTopics();
    }
    setUserAuto(dispatch);
  });
  return (
    <>
      <div className="topic">
        <h2>Danh sách chủ đề ôn luyện</h2>
        <table className="topic__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((item) => (
              <TopicItem item={item} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Topics;
