import { useDispatch } from "react-redux";
// import { getUser } from "../service/users";
import { getCookie } from "./cookie";
import { addUser } from "../redux/authSlice";

export const setUserAuto = (dispatch) => {
  const token = getCookie("token");
  const username = getCookie("username");
  const userId = getCookie("id");
  const role = getCookie("role");
  if (token) {
    dispatch(
      addUser({
        id: userId,
        username: username,
        token: token,
        role: role,
      })
    );
  }
};
