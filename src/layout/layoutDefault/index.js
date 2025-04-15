import { Link, Navigate, NavLink, Outlet } from "react-router";
import "./layoutDefault.scss";
import InfoUser from "../../components/infoUser";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <Link to={"/"}>Quiz</Link>
          </div>
          {isLogin && (
            <div className="layout-default__menu-main">
              <ul>
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"topics"}>Topic</NavLink>
                </li>
                <li>
                  <NavLink to={"answers"}>Answers</NavLink>
                </li>
              </ul>
            </div>
          )}
          <div className="layout-default__menu-auth">
            {isLogin ? (
              <>
                <InfoUser />
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                  <li> | </li>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">FOOTER</footer>
      </div>
    </>
  );
}

export default LayoutDefault;
