import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopic } from "../../service/topicService";
import { addTopic } from "../../redux/topicSlice";
import "./home.scss";
import { Link } from "react-router";
import { setUserAuto } from "../../utils/setUserAuto";

function Home() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopics = async function () {
      const response = await fetchTopic();
      dispatch(addTopic(response));
    };
    fetchTopics();
    setUserAuto(dispatch);
  }, []);

  return (
    <>
      <div className="home">
        {isLogin && (
          <>
            <div>
              <p>
                Chào mừng, <b>{user.fullname}</b>{" "}
              </p>
              <p>Chúc bạn có một ngày vui vẻ!</p>
            </div>
            <div className="home__nav">
              <Link to={"/topics"}>Danh sách chủ đề ôn luyện</Link>
              <Link to={"/answers"}>Danh sách các bài đã luyện tập</Link>
            </div>
            <div className="home__hr"></div>
          </>
        )}
        <p>
          Website trắc nghiệm online lập trình Frontend là một nền tảng trực
          tuyến cho phép các lập trình viên Frontend thực hiện các bào kiểm tra
          trắc nghiệm, đánh giá và đo đặc kiến thức của mình trong lĩnh vực lập
          trình Frontend.
        </p>
        <p>
          Đối với các lập trình viên Frontend, website trắc nghiệm online cung
          cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình
          trong các công nghệ và công cụ lập trình như HTML, CSS, Javascript,
          Bootstrap, React,...
        </p>
      </div>
    </>
  );
}

export default Home;
