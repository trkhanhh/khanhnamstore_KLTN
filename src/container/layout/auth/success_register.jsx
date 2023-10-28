import { Link } from "react-router-dom";
import iconSuccess from "../../../asset/images/verify.png";
import { useTranslation } from "react-i18next";
import { Layout } from "..";

function SuccessRegister() {
  const [t] = useTranslation("app");
  return (
  <Layout>
      <div className="container ">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 gap-2 mx-2 py-20 ">
        <div className="col-start-3 col-span-2 p-3 my-10 pt-15">
          <div className="order-detail text-center ">
            <img src={iconSuccess} alt="icon" className="mx-auto" />
            <p>
              {t("success_register")}
            </p>
            <div className="text-center pt-4">
              <Link to="/login" className="underline">{t("come_back")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
}

export default SuccessRegister;
