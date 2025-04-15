import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ResultItem from "../../components/result/resultItem";
import "./result.scss";
import { fetchAnswerDetail } from "../../service/answerService";
import { fetchQuestion } from "../../service/questionService";
import { useSelector } from "react-redux";
import { getTopicDetails } from "../../service/topicService";

function Result() {
  const params = useParams();
  const [answersUser, setAnswersUser] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setInCorrect] = useState(0);
  const [totalQuest, setTotalQuest] = useState(0);
  const [quizs, setQuizs] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [topic, setTopic] = useState(null);

  const navigate = useNavigate();
  const topics = useSelector((state) => state.topic.topics);

  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await fetchAnswerDetail(params.id);
      setAnswers(response.answers);
      if (response) {
        const quizRes = await fetchQuestion(response.topicId);
        setQuizs(quizRes);
        const topicRes = await getTopicDetails(response.topicId);
        if (topicRes) {
          setTopic(topicRes);
        }
      }
    };
    fetchAnswer();
  }, []);

  useEffect(() => {
    let resultAnswers = [];

    for (let i = 0; i < answers.length; i++) {
      const question = quizs.find((item) => item.id === answers[i].questionId);
      if (question) {
        resultAnswers.push({
          question: question.question,
          answers: question.answers,
          isChecked: answers[i].answer !== -1,
          isCorrect: answers[i].answer === question.correctAnswer,
          indexCorrect: question.correctAnswer,
          indexAnswer: answers[i].answer,
        });
      }
    }
    setCorrect(resultAnswers.filter((item) => item.isCorrect).length);
    setInCorrect(resultAnswers.filter((item) => !item.isCorrect).length);
    setTotalQuest(resultAnswers.length);

    setAnswersUser(resultAnswers);
  }, [quizs, answers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/quiz/" + topic.id);
  };

  return (
    <>
      <div className="result">
        <h3>Kết quả bài quiz chủ đề {topic ? topic.name : ""}</h3>
        <div className="result__score">
          <span className="result__correct">
            Đúng: <b>{correct}</b>
            {" | "}
          </span>
          <span className="result__incorrect">
            Sai: <b>{inCorrect}</b>
            {" | "}
          </span>
          <span className="result__total-quest">
            Tổng số câu: <b>{totalQuest}</b>
            {" | "}
          </span>
          <span className="result__percent">
            Tỷ lệ đúng: {((correct * 100) / totalQuest).toFixed(0)}%{" "}
          </span>
        </div>
        <form className="result__form" onSubmit={handleSubmit}>
          {answersUser.map((item, index) => (
            <ResultItem item={item} index={index} key={index} />
          ))}
          <button type="submit">Làm lại</button>
        </form>
      </div>
    </>
  );
}

export default Result;
