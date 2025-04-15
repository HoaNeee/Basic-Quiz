import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeUser } from "../../redux/authSlice";
import { deleteCookie } from "../../utils/cookie";

function InfoUser() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookie("token");
    dispatch(removeUser());
  };

  return (
    <>
      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {user.role === "admin" && (
            <Link
              style={{
                textDecoration: "none",
                marginLeft: "10px",
                marginRight: "10px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            >
              Quan ly
            </Link>
          )}
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            {user.username}
          </span>
          <Link
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
            onClick={handleLogout}
            to={"/login"}
          >
            Logout
          </Link>
        </div>
      )}
    </>
  );
}

export default InfoUser;
