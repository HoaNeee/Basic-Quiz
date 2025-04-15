import { Route, Routes } from "react-router";
import "./App.css";
import LayoutDefault from "./layout/layoutDefault";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Regitser from "./pages/auth/register";
import Topics from "./pages/topics";
import Answers from "./pages/answers";
import Quiz from "./pages/quiz";
import Result from "./pages/result";
import PrivateRoute from "./components/privateRoute";
import { useEffect } from "react";
import { fetchTopic } from "./service/topicService";
import { addTopic } from "./redux/topicSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuto } from "./utils/setUserAuto";
import PrivateAdmin from "./components/privateRoute/privateAdmin";
import EditTopic from "./pages/admin/edit-topic";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTopic().then((data) => {
      dispatch(addTopic(data));
      setUserAuto(dispatch);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Regitser />} />
          <Route path="topics" element={<Topics />} />

          <Route element={<PrivateRoute />}>
            <Route path="answers" element={<Answers />} />
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="result/:id" element={<Result />} />
            <Route element={<PrivateAdmin />}>
              <Route path="edit-topic/:id" element={<EditTopic />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
