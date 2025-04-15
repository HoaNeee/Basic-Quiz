import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { deleteQuiz } from "../../../service/questionService";

function DeleteQuiz(props) {
  const { record, onFetchUpdate, message } = props;
  const [openModal, setOpenModal] = useState();

  const hideModal = () => {
    setOpenModal(false);
  };
  const handleDelete = async () => {
    const result = await deleteQuiz(record.id);
    if (result) {
      message.open({
        type: "success",
        content: "Đã Xóa",
        duration: 2,
      });
      onFetchUpdate();
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        danger
        icon={<DeleteOutlined />}
      ></Button>
      <Modal
        open={openModal}
        onCancel={hideModal}
        title="Xác nhận"
        onOk={handleDelete}
      >
        Bạn có chắc muốn xóa mục này không?
      </Modal>
    </>
  );
}

export default DeleteQuiz;
