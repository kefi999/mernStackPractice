import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; //just icons
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="header">
      {/* this is the default (homepage) Dashboard.js */}
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        // user ? it means it will check if the user variable exists if it's yes
        !
        {user ? (
          <>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* this is linked to url /register which is linked to Register.js through the app Route */}

            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
        {/* this is linked to url /login which is linked to Login.js through the app Route */}
      </ul>
    </div>
  );
}

export default Header;
