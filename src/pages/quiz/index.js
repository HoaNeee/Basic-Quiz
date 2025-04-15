import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router";
import { fetchQuestion } from "../../service/questionService";
import QuizItem from "../../components/quiz/quizItem";
import "./quiz.scss";
import { useDispatch, useSelector } from "react-redux";
import { addAnswersUser } from "../../service/answerService";
import { addTopic } from "../../redux/topicSlice";

function Quiz() {
  const params = useParams();
  const [quizs, setQuizs] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const topics = useSelector((state) => state.topic.topics);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const topic = topics.find((item) => item.id === params.id);

  useEffect(() => {
    // fetchQuestion(params.id).then((data) => {
    //   setQuizs(data);
    // });

    const fetchQuestions = async () => {
      const response = await fetchQuestion(params.id);
      setQuizs(response);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (topics.length <= 0) {
      const fetchTopic = async () => {
        const res = await fetchTopic();
        dispatch(addTopic(res));
      };
    }
  }, [topics]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objAnswer = {};
    let arrInput = [...e.target.children];

    for (let i = 0; i < arrInput.length - 1; i++) {
      const qInput = arrInput[i].children[1].children[0].name;

      let checked = false;
      const arr2 = [...arrInput[i].children];
      for (let j = 0; j < arr2.length; j++) {
        let input = arr2[j].firstElementChild;

        if (input) {
          if (input.checked) {
            checked = true;
          }
        }
      }

      if (!checked) {
        objAnswer[qInput] = -1;
      } else {
        const valueChecked = arr2.find(
          (item) => item.firstElementChild && item.firstElementChild.checked
        );
        objAnswer[valueChecked.firstElementChild.name] = Number(
          valueChecked.firstElementChild.value
        );
      }
    }

    let answers = [];
    for (let key in objAnswer) {
      answers.push({
        questionId: key,
        answer: objAnswer[key],
      });
    }
    console.log(answers);

    const result = await addAnswersUser({
      userId: user.id,
      topicId: topic.id,
      answers: answers,
    });
    if (result) {
      navigate("/result/" + result.id);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target);
  };

  return (
    <>
      {topic && (
        <div className="quiz">
          <h3>Bài quiz chủ đề {topic.name}</h3>
          <form className="quiz__form" onSubmit={handleSubmit}>
            {quizs.map((item, index) => (
              <QuizItem item={item} index={index} key={index} />
            ))}
            <button type="submit">Nộp bài</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Quiz;
