import { useTranslation } from "react-i18next";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NavbarMini from "../component/nav_mini";

function AddressManager({ setAccountUser }) {
  const [t] = useTranslation("app");
  const handLogout = () => {
    setAccountUser({});
  };
  return (
    <div className="pt-20  mt-5 sm:mt-0  px-8">
      <div className="lg:w-5/6 w-full mx-auto">
        <div className="history">
          <Link to="/" className="uppercase text-xs px-1">
            {t("home")}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
          <Link to="/" className="uppercase text-xs px-1">
            {t("address")}
          </Link>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 py-4">
          <div>
            <NavbarMini handLogout={handLogout} />
          </div>
          <div className="col-span-3 ">
            <div className="user-profile p-3">
              <div className="header-manager md:flex justify-between border-b pb-3 ">
                <h2 className="md:text-2xl text-xl my-auto font-medium">{t("your_address")}</h2>
                <button className="bg-orange-600 text-white py-2 px-3 ">
                {t("add_address")}
                </button>
              </div>
              <div className="content-manager py-3">
                <h2 className="text-lg font-medium">{t("address")}</h2>
                <div className="justify-between border-b py-2">
                  <div className="information">
                    <h3 className="name text-base font-medium">Cao sơn</h3>
                    <span className="text-slate-500 text-sm font-normal">+84 378558674</span>
                    <div className="address w-full lg:w-2/3 md:w-10/12 text-slate-500 text-sm font-normal" >
                      Đại học Bình Dương, Đại lộ Bình Dương Phường Hiệp Thành,
                      Thành Phố Thủ Dầu Một, Bình Dương
                    </div>
                  </div>
                  <div className="action text-right">
                    <button className="text-blue-500">{t("update")}</button>
                  </div>
                </div>
                <div className="block justify-between border-b py-2">
                  <div className="information">
                    <h3 className="name text-base font-medium">Cao sơn</h3>
                    <span className="text-slate-500 text-sm font-normal">+84 378558674</span>
                    <div className="address w-full  lg:w-2/3 md:w-10/12 text-slate-500 text-sm font-normal" >
                      Đại học Bình Dương, Đại lộ Bình Dương Phường Hiệp Thành,
                      Thành Phố Thủ Dầu Một, Bình Dương
                    </div>
                  </div>
                  <div className="action text-right">
                    <button className="text-blue-500">{t("update")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressManager;
