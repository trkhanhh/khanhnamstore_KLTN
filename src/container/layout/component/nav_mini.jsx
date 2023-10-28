import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import iconLogout from "../../../asset/images/logout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/AuthSlice";

function NavbarMini() {
  const [t] = useTranslation("app");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };
  return (
    <ul>
      <li>
        <Link
          to="/user-profile"
          className="flex py-2 justify-start items-center"
        >
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
          <span className="px-2">{t("user_profile")}</span>
        </Link>
      </li>
      <li>
        <Link to="/orders" className="flex py-2 justify-start items-center">
          <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "20px" }} />
          <span className="px-2 ">{t("orders")}</span>
        </Link>
      </li>
      <li>
        <Link
          to="/address-manager"
          className="flex py-2 justify-start items-center"
        >
          <FontAwesomeIcon icon={faMap} style={{ fontSize: "20px" }} />
          <span className="px-2 ">{t("address_manager")}</span>
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="flex py-2 items-center justify-start"
          type="reset"
        >
          <img src={iconLogout} alt="iconLogout" />
          <span className="px-2 text-red-500">{t("logout")}</span>
        </button>
      </li>
    </ul>
  );
}

export default NavbarMini;
