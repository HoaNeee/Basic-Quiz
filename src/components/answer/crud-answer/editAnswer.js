import { Button, Form, Input, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

//recommend co the su dung or no
//fix duoc bug state thi dung
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef(null);
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

const ModalForm = ({ open, onCancel, value, index, record, type }) => {
  const [form] = Form.useForm();
  // useResetFormOnCloseModal({
  //   form,
  //   open,
  // });
  const handleFinish = (value, onCancel) => {
    onCancel();
  };

  return (
    <Modal
      title="Chỉnh sửa câu trả lời"
      footer={false}
      open={open}
      onCancel={onCancel}
    >
      <Form
        onFinish={(e) => handleFinish(e, onCancel)}
        form={form}
        layout="vertical"
        name={
          type === "updateQuiz"
            ? `editAnswer${record.id}-${index}`
            : `editAnswer${index}`
        }
      >
        <Form.Item
          name="answer"
          rules={[{ required: true }]}
          initialValue={value}
        >
          <Input placeholder="VD: True" />
        </Form.Item>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button htmlType="submit" type="primary">
            OK
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

function EditAnswer(props) {
  const { value, index, record, type } = props;

  const [open, setOpen] = useState(false);
  const showAnswerModal = () => {
    setOpen(true);
  };
  const hideAnswerModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button icon={<EditOutlined />} onClick={showAnswerModal} />
      <ModalForm
        onCancel={hideAnswerModal}
        open={open}
        value={value}
        index={index}
        record={record}
        type={type}
      />
    </>
  );
}

export default EditAnswer;
