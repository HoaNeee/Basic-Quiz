import { Button, Flex, Form, Input, InputNumber, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddAnswers from "../../answer/crud-answer/addAnswer";
import EditAnswer from "../../answer/crud-answer/editAnswer";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import DeleteAnswer from "../../answer/crud-answer/deleteAnswer";
import { addQuizAnswer } from "../../../service/questionService";

function AddQuiz(props) {
  const { topic, onFetchUpdate, message } = props;

  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();

  const openModalAdd = () => {
    setOpenModal(true);
  };
  const hideModalAdd = () => {
    form.resetFields(); //tranh truong hop them hoac sua nhung khong save
    setOpenModal(false);
  };

  const handleAddQuiz = async (value) => {
    const result = await addQuizAnswer(value);

    if (result) {
      message.open({
        type: "success",
        content: "Thêm thành công!",
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
      <Button onClick={openModalAdd} icon={<PlusOutlined />} type="dashed">
        Add Quiz
      </Button>
      <Modal
        open={openModal}
        onCancel={hideModalAdd}
        okText="Cập nhật"
        cancelText="Hủy"
        footer={false}
      >
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            const nameQuiz = `addQuiz${topic.id}`;
            const editQuizForm = forms[nameQuiz];
            const answers = editQuizForm.getFieldValue("answers") || [];
            if (name === `addAnswer`) {
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
            name={"addQuiz" + topic.id}
            layout="vertical"
            form={form}
            onFinish={handleAddQuiz}
          >
            <Form.Item name={"question"} label="Nội dung câu hỏi" rules={rules}>
              <Input />
            </Form.Item>

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
                      <AddAnswers type={"addQuiz"} />
                    </Space>
                  </Form.Item>
                  <Flex vertical>
                    {fields.length > 0 ? (
                      fields.map((field, index) => {
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
                              type={"addQuiz"}
                              value={answers[Number(field.key)]}
                              index={index}
                            />
                            <DeleteAnswer index={index} form={form} />
                          </Space>
                        );
                      })
                    ) : (
                      <Flex justify="center">
                        <p
                          style={{
                            margin: "10 0",
                            fontSize: 15,
                          }}
                        >
                          Trống
                        </p>
                      </Flex>
                    )}
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
              <InputNumber min={0} />
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

export default AddQuiz;
