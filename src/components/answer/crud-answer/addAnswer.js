import { Button, Form, Input, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

//reset dung form khi co nhieu form hoac rs khi chua can gui du lieu len sv
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

const handleFinish = (onCancel) => {
  onCancel();
};

//giai thich so so
//modal form de khi dong modal se rs form (UseResetForm) hoac tach cho de nhin
const ModalForm = ({ open, onCancel, record, type }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    open,
  });

  return (
    <Modal
      title="Thêm câu trả lời"
      footer={false}
      open={open}
      onCancel={onCancel}
    >
      <Form
        onFinish={() => handleFinish(onCancel)}
        form={form}
        layout="vertical"
        name={type === "updateQuiz" ? `addAnswer${record.id}` : "addAnswer"}
      >
        <Form.Item
          name="answer"
          label="Nhập câu trả lời"
          rules={[{ required: true }]}
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

function AddAnswers(props) {
  const { record, type } = props;

  const [open, setOpen] = useState(false);
  const showAnswerModal = () => {
    setOpen(true);
  };
  const hideAnswerModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        size="small"
        icon={<PlusOutlined />}
        type="dashed"
        onClick={showAnswerModal}
      >
        Thêm câu trả lời
      </Button>
      <ModalForm
        open={open}
        onCancel={hideAnswerModal}
        record={record ? record : undefined}
        type={type}
      />
    </>
  );
}

export default AddAnswers;
