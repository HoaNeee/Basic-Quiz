import { useEffect, useState } from "react";
import { fetchAnswerUser } from "../../service/answerService";
import { useDispatch, useSelector } from "react-redux";
import AnswerItem from "../../components/answer/answerItem";
import "./answers.scss";

function Answers() {
  const [answers, setAnswers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAnswerUser(user.id).then((data) => {
      setAnswers(data.reverse());
    });
  }, [user]);
  return (
    <>
      <div className="answers">
        <h2>Danh sách bài đã ôn luyện</h2>
        {answers.length > 0 ? (
          <table className="answers__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên chủ đề</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {answers.map((item) => (
                <AnswerItem item={item} key={item.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <div>
              <p>Hãy chọn chủ đề bất kỳ và luyện tập</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Answers;
