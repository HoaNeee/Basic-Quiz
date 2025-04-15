import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteAnswer(props) {
  const { index, form } = props;

  const handleDelete = () => {
    const newAnswer = form.getFieldValue("answers");
    const result = newAnswer.filter((_, indexAnswer) => index !== indexAnswer);
    form.setFieldValue("answers", result);
  };
  return (
    <>
      <Popconfirm title="Bạn có chắc?" onConfirm={handleDelete}>
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}

export default DeleteAnswer;
