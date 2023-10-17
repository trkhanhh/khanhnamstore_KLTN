import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import iconCart from "../../../asset/images/baguser.png";
import iconUser from "../../../asset/images/user_light.png";
import iconLogout from "../../../asset/images/logout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMap, faUser } from "@fortawesome/free-solid-svg-icons";

function NavbarMini({handLogout}) {
  const [t] = useTranslation("app");
  return (
    <ul>
      <li>
        <Link to="/user-profile" className="flex py-2">
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
          <span className="px-2">{t("user_profile")}</span>
        </Link>
      </li>
      <li>
        <Link to="/orders" className="flex py-2">
          <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "20px" }} />
          <span className="px-2 ">{t("orders")}</span>
        </Link>
      </li>
      <li>
        <Link to="/address-manager" className="flex py-2">
        <FontAwesomeIcon icon={faMap} style={{ fontSize: "20px" }} />
          <span className="px-2 ">{t("address_manager")}</span>
        </Link>
      </li>
      <li>
        <button onClick={handLogout} className="flex py-2" type="reset">
          <img src={iconLogout} alt="iconLogout" />
          <span className="px-2 text-red-500">{t("logout")}</span>
        </button>
      </li>
    </ul>
  );
}

export default NavbarMini;
