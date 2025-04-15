import { useState } from "react";
import "./scss/login.scss";
import { login } from "../../service/users";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/authSlice";
import { setCookie } from "../../utils/cookie";

function Login() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username && password) {
      const response = await login(username, password);
      if (response.length > 0) {
        navigate("/");
        dispatch(addUser(response[0]));
        setCookie("token", response[0].token, 1);
        setCookie("id", response[0].id, 1);
        setCookie("username", response[0].username, 1);
        setCookie("role", response[0].role, 1);
      } else {
        setError(true);
        setErrorMessage("user not found");
      }
    }
  };
  return (
    <>
      <div className="login">
        <h3>Login Quiz</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <input type="text" defaultValue={""} placeholder="username" />
          <input type="password" defaultValue={""} placeholder="password" />
          {error && <p className="login__error">{errorMessage}</p>}
          <button type="submit" className="login__btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
