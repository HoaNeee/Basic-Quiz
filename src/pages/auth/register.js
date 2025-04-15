import { useState } from "react";
import { registerUser } from "../../service/users";
import "./scss/register.scss";
import { Link } from "react-router";
import randomToken from "../../utils/randomToken";

function Regitser() {
  const [isRegisted, setIsRegisted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (data) => {
    const result = await registerUser(data);
    if (result) {
      setIsRegisted(true);
      setError(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const fullname = e.target[1].value;
    const username = e.target[2].value;
    const password = e.target[3].value;
    const confirmPass = e.target[4].value;
    const token = randomToken();

    if (email && fullname && username && password && confirmPass) {
      if (password === confirmPass) {
        const data = {
          email,
          fullname,
          username,
          password,
          token,
        };
        register(data);
      } else {
        setError(true);
        setErrorMessage("Password and confirm password is not match");
      }
    } else {
      setError(true);
      setErrorMessage("Some field is empty!");
    }
  };

  return (
    <>
      {isRegisted ? (
        <div className="notifi-success">
          <p>
            Register Successfully, please <Link to={"/login"}>login</Link>
          </p>
        </div>
      ) : (
        <div className="register">
          <h3>Register</h3>
          <form className="register__form" onSubmit={handleSubmit}>
            <input type="email" defaultValue={""} placeholder="Email" />
            <input type="text" defaultValue={""} placeholder="Full name" />
            <input type="text" defaultValue={""} placeholder="Username" />
            <input type="password" defaultValue={""} placeholder="Password" />
            <input
              type="password"
              defaultValue={""}
              placeholder="Enter Your Password"
            />
            {error && <p className="login__error">{errorMessage}</p>}
            <button type="submit" className="register__btn">
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Regitser;
