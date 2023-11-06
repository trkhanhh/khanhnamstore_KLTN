import { useTranslation } from "react-i18next";
import HeaderAdmin from "../component/header";
import HomeAdmin from "..";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../slices/AlertSlice";
import { addUser } from "../../../thunks/UserThunk";
import { addCategory } from "../../../thunks/CategoryThunk";
import { upload } from "../../../app/firebase.process";

function CategoryCreate() {
  const [t] = useTranslation("app");
  const [cat, setCat] = useState({});
  const { categories } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  const [imageBanner, setImageBanner] = useState();
  const [imageBannerUploaded, setImageBannedUploaded] = useState();
  const handleCreateCategory = async () => {
    if (Object.keys(cat).length == 0 || cat?.name == "") {
      dispatch(setAlert({ type: "error", content: "Form invalid" }));
      return;
    }
    await upload(imageBanner, handleSetImage);
    let category = categories.filter((cat) => cat.id == cat.category);
    const data = {
      name: cat.name,
      isPrimary: cat?.category ? cat.category == -1 : true,
      imageBanner: imageBannerUploaded,
      category: category ? category[0] : null,
    };
    dispatch(addCategory(data));
  };
  const handleSetImage = (downloadURL) => {
    setImageBannedUploaded(downloadURL);
  };
  return (
    <HomeAdmin>
      <div className="w-10/12 bg-slate-700 text-white h-screen  flex flex-col overflow-y-hidden ">
        <HeaderAdmin />
        <div className="w-full overflow-x-hidden">
          <main className="w-full flex-grow p-6">
            <h1 className="w-full text-3xl pb-6">{t("Add Category")}</h1>

            <div className="flex flex-wrap">
              <div className="w-full  my-6 pr-0 lg:pr-2">
                <div className="leading-loose">
                  <div className="p-10 bg-white rounded shadow-xl">
                    <div>
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="name"
                      >
                        {t("Category name")}
                      </label>
                      <input
                        onChange={(e) => {
                          setCat({ ...cat, name: e.target.value });
                        }}
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t("Enter category name")}
                        aria-label="Name"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="name"
                      >
                        {t("Category parent")}
                      </label>
                      <select
                        onChange={(e) =>
                          setCat({ ...cat, category: e.target.value })
                        }
                        className="w-full px-5 py-2 text-sm  text-gray-700 bg-gray-200 rounded"
                      >
                        <option value={-1}>Parent category</option>
                        {categories.map((val, index) => {
                          return (
                            <option key={index} value={val.id}>
                              {val.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtName"
                      >
                        {t("category images")}
                      </label>
                      <input
                        onChange={(e) => {
                          setImageBanner(e.target.files[0]);
                        }}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        type="file"
                        required
                        multiple
                      />
                      <div className="my-2">
                        <div className="flex flex-row gap-2">
                          {imageBanner && (
                            <img
                              src={URL.createObjectURL(imageBanner)}
                              style={{
                                maxWidth: "240px",
                                maxHeight: "240px",
                                borderRadius: 4,
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <Link
                        to={"/admin/category-manager"}
                        type="button"
                        className="px-4 py-1 text-white font-light tracking-wider mx-3 rounded"
                        style={{ backgroundColor: "black" }}
                      >
                        {t("come_back")}
                      </Link>
                      <button
                        onClick={handleCreateCategory}
                        className="px-4 py-1 text-white font-light tracking-wider  rounded"
                        style={{ backgroundColor: "black" }}
                      >
                        {t("save_update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </HomeAdmin>
  );
}

export default CategoryCreate;
