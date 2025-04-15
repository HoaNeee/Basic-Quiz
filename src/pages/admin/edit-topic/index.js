import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTopicDetails } from "../../../service/topicService";
import { fetchQuestion } from "../../../service/questionService";
import { message, Space, Table } from "antd";
import EditTopicComponent from "../../../components/editComponent/edit-quiz";
import DeleteQuiz from "../../../components/editComponent/delete-quiz";

import AddQuiz from "../../../components/editComponent/add-quiz";

function EditTopic() {
  const param = useParams();
  const [topic, setTopic] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [messageApi, messageContext] = message.useMessage();

  const fetchTopic = async function () {
    const res = await getTopicDetails(param.id);
    if (res) {
      const resQuiz = await fetchQuestion(res.id);
      setQuiz(resQuiz);
    }
    setTopic(res);
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answers",
      dataIndex: "answers",
      key: "answers",
      render: (item, record) => {
        return item.length;
      },
    },
    {
      title: "Index Answer",
      dataIndex: `correctAnswer`,
      key: "correctAnswer",
      // render: (item, record) => {
      //   return item + 1;
      // },
    },
    {
      title: "Action",
      render: (item, record) => {
        return (
          <>
            <Space>
              <EditTopicComponent
                record={record}
                onFetchUpdate={fetchTopic}
                message={message}
              />
              <DeleteQuiz
                record={record}
                onFetchUpdate={fetchTopic}
                message={message}
              />
            </Space>
          </>
        );
      },
    },
  ];

  return (
    topic &&
    quiz && (
      <>
        {messageContext}
        <div>
          <h3>Chủ đề: {topic.name}</h3>
          <Space size={20} align="baseline">
            <p
              style={{
                margin: 0,
                marginBottom: 20,
              }}
            >
              Số lượng câu hỏi: {quiz.length}
            </p>
            <AddQuiz
              topic={topic}
              onFetchUpdate={fetchTopic}
              message={message}
            />
          </Space>
          <Table columns={columns} dataSource={quiz} rowKey={"id"} />
        </div>
      </>
    )
  );
}

export default EditTopic;
