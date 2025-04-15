import { useSelector } from "react-redux";
import { Link } from "react-router";

function AnswerItem(props) {
  const { item } = props;
  const topics = useSelector((state) => state.topic.topics);
  const topic = topics.find((itemQuest) => itemQuest.id === item.topicId);

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{topic ? topic.name : "null"}</td>
        <td>
          <Link to={"/result/" + item.id}>Xem chi tiết</Link>
        </td>
      </tr>
    </>
  );
}

export default AnswerItem;
