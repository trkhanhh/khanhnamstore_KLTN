import { useTranslation } from "react-i18next";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NavbarMini from "../component/nav_mini";
import { Layout } from "..";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import address_default from "../../../asset/images/default_address.jpg";
import {
  addNewAddress,
  deleteAddress,
  getAllAddress,
  getAllAddressByUser,
  updateAddress,
} from "../../../thunks/AddressThunk";
import { setAlert } from "../../../slices/AlertSlice";

function AddressManager({ setAccountUser }) {
  const [t] = useTranslation("app");
  const [hidden, setHidden] = useState(true);
  const { allAddress, addresses } = useSelector(
    (state) => state.addressReducer
  );
  const [updateId, setUpdateId] = useState(-1);
  const { user } = useSelector((state) => state.authReducer);
  const [street, setStreet] = useState("");
  const [selectedCity, setSelectedCity] = useState({ id: -1, index: 1 });
  const [selectedDistrict, setSelectedDistricts] = useState({
    id: -1,
    index: 1,
  });
  const [selectedWard, setSelectedWard] = useState({ id: -1, index: 1 });
  const [isAdd, setIsAdd] = useState(true);
  const dispatch = useDispatch();

  const handModalAddress = () => {
    setHidden(false);
    setIsAdd(true);
  };
  useLayoutEffect(() => {
    if (allAddress.length <= 0) {
      dispatch(getAllAddress());
      dispatch(getAllAddressByUser());
    }
  }, []);

  useLayoutEffect(() => {
    if (allAddress.length > 0) {
      setSelectedDistricts({
        id: allAddress[selectedCity.index].districts[0].id,
        index: 0,
      });
    }
  }, [selectedCity]);

  useLayoutEffect(() => {
    if (allAddress.length > 0) {
      setSelectedWard({
        id: allAddress[selectedCity.index].districts[0].wards[0].id,
        index: 0,
      });
    }
  }, [selectedDistrict]);

  useLayoutEffect(() => {}, [selectedWard]);
  const handleAddNewAddress = () => {
    if (street.trim().length <= 0) {
      dispatch(setAlert({ type: "error", content: t("empty_street") }));
      return;
    }
    const data = {
      fullname: user.fullname,
      phone: user.phone ?? "",
      streetName: street,
      wards: {
        id: selectedWard.id,
      },
    };
    if (isAdd) {
      dispatch(addNewAddress(data)).then((resp) => {
        if (!resp?.errors) {
          setHidden(true);
          dispatch(getAllAddressByUser());
        }
      });
    } else {
      data.id = updateId;
      dispatch(updateAddress(data)).then((resp) => {
        if (!resp.errors) {
          setHidden(true);
          dispatch(getAllAddressByUser());
        }
      });
    }
  };
  const handleOpenUpdateForm = (id) => {
    setIsAdd(false);
    const updateAddress = addresses.filter((add) => add.id === id)[0];
    setUpdateId(id);
    setHidden(false);
    setSelectedCity({
      id: updateAddress.wards.districts.province.id,
      index: 0,
    });
    setStreet(updateAddress.streetName);
  };
  const handleDelete = (id) => {
    if (window.confirm(t("confirm_delete"))) {
      dispatch(deleteAddress(id));
    }
  };
  return (
    <Layout>
      <div className="pt-20 mt-5 sm:mt-0 px-4 min-h-screen">
        <div className="lg:w-5/6 w-full mx-auto mt-12">
          <div className="history">
            <Link to="/" className="uppercase text-xs px-1">
              {t("home")}
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "10px" }}
            />
            <Link to="/address-manager" className="uppercase text-xs px-1">
              {t("address")}
            </Link>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 py-4">
            <div>
              <NavbarMini />
            </div>
            <div className="col-span-3 ">
              <div className="user-profile">
                <div className="header-manager md:flex justify-between border-b pb-3 ">
                  <h2 className="md:text-2xl text-xl my-auto font-medium">
                    {t("your_address")}
                  </h2>
                  <button
                    className="bg-black text-white py-2 px-1 sm:px-3 text-sm sm:text-base "
                    onClick={() => handModalAddress(false)}
                  >
                    {t("add_address")}
                  </button>
                </div>
                <div
                  className="content-manager py-3"
                  style={{ maxHeight: "100vh", overflowY: "auto" }}
                >
                  {addresses.length == 0 ? (
                    <div className="order-detail text-center ">
                      <img
                        src={address_default}
                        alt="product"
                        className="mx-auto w-7/12 sm:w-6/12 lg:w-4/12"
                      />
                      <p>{t("empty_address")}</p>
                    </div>
                  ) : (
                    addresses.map((add, index) => {
                      return (
                        <div
                          key={index}
                          className="justify-between border-b py-2"
                        >
                          <div className="information">
                            <h3 className="name text-sm sm:text-base font-medium">
                              {add.user.fullname}
                            </h3>
                            <span className="text-slate-500 text-xs sm:text-sm font-normal">
                              {add.phone}
                            </span>
                            <div className="address w-full lg:w-2/3 md:w-10/12 text-slate-500 text-xs sm:text-sm font-normal">
                              {add.streetName +
                                "," +
                                add.wards.name +
                                "," +
                                add.wards.districts.name +
                                "," +
                                add.wards.districts.province.name}
                            </div>
                          </div>
                          <div className="action text-right flex gap-2 justify-end">
                            <button
                              className="text-blue-500 text-sm sm:text-base"
                              onClick={() => {
                                handleOpenUpdateForm(add.id);
                              }}
                            >
                              {t("update")}
                            </button>
                            <button
                              className="text-red-500 text-sm sm:text-base"
                              onClick={() => {
                                handleDelete(add.id);
                              }}
                            >
                              {t("delete")}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        hidden={hidden}
        class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden bg-zinc-400/25 overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full"
      >
        <div class="relative w-full max-w-2xl max-h-full mx-auto mt-10">
          <div class="relative bg-white rounded-lg shadow">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {t("add_address")}
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                onClick={() => setHidden(true)}
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">{t("close_modal")}</span>
              </button>
            </div>
            <div class="p-6 space-y-6">
              <div>
                <div className="mx-auto max-w-xl">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      {t("province_city")}{" "}
                      <span className="text-red-500">*</span>:
                    </span>
                    <select
                      onChange={(e) => {
                        setSelectedCity({
                          id: e.target.value,
                          index:
                            e.target.options[e.target.selectedIndex].dataset
                              .index,
                        });
                      }}
                      required
                      placeholder=""
                      type="text"
                      className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                    >
                      {allAddress.map((city, index) => {
                        return (
                          <option
                            data-index={index}
                            key={index}
                            value={city.id}
                          >
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      {t("districts_towns")}{" "}
                      <span className="text-red-500">*</span>:
                    </span>
                    <select
                      onChange={(e) => {
                        setSelectedDistricts({
                          id: e.target.value,
                          index:
                            e.target.options[e.target.selectedIndex].dataset
                              .index,
                        });
                      }}
                      required
                      placeholder=""
                      type="text"
                      className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                    >
                      {allAddress[selectedCity.index]?.districts.map(
                        (dis, index) => {
                          return (
                            <option
                              data-index={index}
                              key={index}
                              value={dis.id}
                            >
                              {dis.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      {t("wards")} <span className="text-red-500">*</span>:
                    </span>
                    <select
                      onChange={(e) =>
                        setSelectedWard({
                          id: e.target.value,
                          index:
                            e.target.options[e.target.selectedIndex].dataset
                              .index,
                        })
                      }
                      required
                      placeholder=""
                      type="text"
                      className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                    >
                      {allAddress[selectedCity.index]?.districts[
                        selectedDistrict.index
                      ]?.wards.map((ward, index) => {
                        return (
                          <option
                            data-index={index}
                            key={index}
                            value={ward.id}
                          >
                            {ward.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      {t("detail_address")}:
                    </span>
                    <input
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                      required
                      value={street}
                      placeholder=""
                      type="text"
                      className="w-full px-4 py-2  text-base  border border-gray-300 rounded outline-none  focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              <button
                onClick={handleAddNewAddress}
                data-modal-hide="defaultModal"
                className=" text-white bg-black hover:bg-black-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddressManager;
