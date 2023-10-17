import { Link } from "react-router-dom";
import iconSuccess from "../../../asset/images/verify.png";
import { useTranslation } from "react-i18next";

function SuccessRegister() {
  const [t] = useTranslation("app");
  return (
    <div className="container ">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20 ">
        <div className="col-start-3 col-span-2 p-3 my-10 pt-15">
          <p className="text-base py-3 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="order-detail text-center ">
            <img src={iconSuccess} alt="icon" className="mx-auto" />
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s.
            </p>
            <div className="text-center pt-4">
              <Link to="/login" className="underline">{t("come_back")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessRegister;
