import { DeleteOutlined, EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, Modal, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import AddAnswers from "../../answer/crud-answer/addAnswer";
import EditAnswer from "../../answer/crud-answer/editAnswer";
import { updateAnswerQuiz } from "../../../service/questionService";
import DeleteAnswer from "../../answer/crud-answer/deleteAnswer";

function EditTopicComponent(props) {
  const { record, onFetchUpdate, message } = props;

  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();

  const openModalEdit = () => {
    setOpenModal(true);
  };
  const hideModalEdit = () => {
    form.resetFields(); //tranh truong hop them hoac sua nhung khong save
    setOpenModal(false);
  };

  const handleEditQuiz = async (value) => {
    const result = await updateAnswerQuiz(record.id, value);
    if (result) {
      message.open({
        type: "success",
        content: "Chỉnh sửa thành công!",
        duration: 2,
      });
      onFetchUpdate();
      setOpenModal(false);
    }
  };

  const rules = [
    {
      required: true,
      message: "Trường này là bắt buộc!",
    },
  ];

  return (
    <>
      <Button
        onClick={openModalEdit}
        icon={<EditFilled />}
        type="primary"
      ></Button>
      <Modal
        open={openModal}
        onCancel={hideModalEdit}
        okText="Cập nhật"
        cancelText="Hủy"
        footer={false}
      >
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            const nameQuiz = `editQuiz${record.id}`;
            const editQuizForm = forms[nameQuiz];
            const answers = editQuizForm.getFieldValue("answers") || [];
            if (name === `addAnswer${record.id}`) {
              editQuizForm.setFieldValue("answers", [
                ...answers,
                values["answer"],
              ]);
            } else if (name.includes("editAnswer")) {
              const index = Number(name[name.length - 1]);
              const newAnswers = [...answers];
              newAnswers[index] = values.answer;
              editQuizForm.setFieldValue("answers", newAnswers);
            }
          }}
        >
          <Form
            name={"editQuiz" + record.id}
            layout="vertical"
            form={form}
            initialValues={{ ...record, answers: [...record.answers] }}
            onFinish={handleEditQuiz}
          >
            <Form.Item name={"question"} label="Nội dung câu hỏi" rules={rules}>
              <Input />
            </Form.Item>
            {/* 
            cac lua chon
            1. dung form khac (khong kha thi)
            2. dung form item voi should update, getfieldValue
            3. dung formList(dep)
          */}
            <Space></Space>
            <Form.List name={"answers"}>
              {(fields, { add, remove }) => (
                <>
                  <Form.Item label="Các câu trả lời" noStyle>
                    <Space align="baseline">
                      <p
                        style={{
                          marginTop: 0,
                        }}
                      >
                        Các câu trả lời
                      </p>
                      <AddAnswers record={record} type={"updateQuiz"} />
                    </Space>
                  </Form.Item>
                  <Flex vertical>
                    {fields.map((field, index) => {
                      const answers = form.getFieldValue("answers");
                      return (
                        <Space
                          key={field.key}
                          align="baseline"
                          style={{
                            marginLeft: 10,
                          }}
                        >
                          <Form.Item key={field.key} name={field.name}>
                            <span>
                              Câu {index + 1}. {answers[Number(field.key)]}
                            </span>
                          </Form.Item>
                          <EditAnswer
                            type="updateQuiz"
                            value={answers[Number(field.key)]}
                            index={index}
                            record={record}
                          />
                          <DeleteAnswer index={index} form={form} />
                        </Space>
                      );
                    })}
                  </Flex>
                </>
              )}
            </Form.List>

            <Form.Item
              label={
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  Index câu trả lời đúng <strong>(0-indexed)</strong>
                </p>
              }
              name="correctAnswer"
              rules={rules}
            >
              <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form>
        </Form.Provider>
      </Modal>
    </>
  );
}
export default EditTopicComponent;
