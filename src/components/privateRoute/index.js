import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { getCookie } from "../../utils/cookie";

function PrivateRoute() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const token = getCookie("token");
  //   useEffect(() => {
  //     if (!isLogin) {
  //       navigate(-1);
  //     }
  //   }, [isLogin]);

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}

export default PrivateRoute;
