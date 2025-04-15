import { useSelector } from "react-redux";
import { Outlet } from "react-router";

function PrivateAdmin() {
  const user = useSelector((state) => state.auth.user);
  if (user && user.role === "admin") {
    return <Outlet />;
  }
  return <>You don't have permission</>;
}

export default PrivateAdmin;
