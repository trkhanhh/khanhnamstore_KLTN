import { useTranslation } from "react-i18next";
import HeaderAdmin from "../component/header";
import HomeAdmin from "..";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductColorList,
  getProductUpdateById,
  updateProduct,
} from "../../../thunks/ProductThunk";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useParams } from "react-router-dom";
import { upload, uploadNoCallBack } from "../../../app/firebase.process";
import { setAlert } from "../../../slices/AlertSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductUpdate() {
  const { id } = useParams();
  const [t] = useTranslation("app");
  const dispatch = useDispatch();
  const { manager } = useSelector((state) => state.productReducer);
  const { categories } = useSelector((state) => state.categoryReducer);

  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [newColorIndex, setNewColorIndex] = useState();
  const [imageBanner, setImageBanner] = useState();
  const [images, setImages] = useState([]);
  const imagesUploaded = useRef([]);
  const imageBannerUploaded = useRef("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [color, setColor] = useState({});
  const [colorSize, setColorSize] = useState([]);
  const [size, setSize] = useState({});
  const [productColors, setProductColors] = useState([]);
  const [colorImg, setColorImg] = useState("");
  const [colorImgUploaded, setColorImgUploaded] = useState();
  const colorImgRef = useRef(null);

  useLayoutEffect(() => {
    dispatch(getAllProductColorList());
  }, []);
  useLayoutEffect(() => {}, [imageBanner]);
  useLayoutEffect(() => {}, [images]);
  useLayoutEffect(() => {
    if (manager.colors.length > 0) {
      setSelectedColor([manager.colors[0]]);
      setSelectedSize([manager.colors[0].productSizes[0]]);
    }
  }, [manager.colors]);

  useLayoutEffect(() => {
    let index = 0;
    for (let i = 0; i < manager.colors.length; i++) {
      if (manager.colors[i].id == selectedColor[selectedColor.length - 1]?.id) {
        index = i;
      }
    }
    setNewColorIndex(index);
  }, [selectedColor]);
  useLayoutEffect(() => {}, [selectedSize]);
  const handleUpdateProduct = async () => {
    if (
      product.code === "" ||
      product.name == "" ||
      product.description == "" ||
      !product.price
    ) {
      dispatch(setAlert({ type: "error", content: "Form not valid" }));
      return;
    }
    if (!isUpdating) {
      setIsUpdating(true);
      for (let image of images) {
        const url = await uploadNoCallBack(image);
        let uploaded = [...imagesUploaded.current];
        uploaded.push(url);
        imagesUploaded.current = uploaded;
      }
      if (imageBanner) {
        await upload(imageBanner, handleSetImageBannerUploaded);
      }
      if (
        imagesUploaded.current.length == images.length &&
        imageBannerUploaded.current != ""
      ) {
        const data = {
          id: manager.productUpdate.id,
          code: product.code,
          name: product.name,
          description: product.description,
          imageBanner:
            imageBannerUploaded.current != ""
              ? imageBannerUploaded.current
              : product.imageBanner,
          price: product.price,
          listCategoryIds: product.categoryId
            ? [product.categoryId]
            : product.listCategoryIds,
          linkLinkImages:
            imagesUploaded.current.length > 0
              ? imagesUploaded.current
              : product.linkLinkImages,
          colors: productColors.length > 0 ? productColors : product.colors,
        };
        console.log(data);
        dispatch(updateProduct(data));
        setIsUpdating(false);
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: "Select Image For Update",
          })
        );
      }
    } else {
      dispatch(
        setAlert({
          type: "error",
          content: "Processing update product",
        })
      );
    }
  };

  const handleSetImageBannerUploaded = (downloadUrl) => {
    imageBannerUploaded.current = downloadUrl;
  };
  const handleToggleSelectColor = (checked, color) => {
    let selected = [...selectedColor];
    if (checked) {
      selected.push(color);
    } else {
      selected = selected.filter((color_) => color_.id != color.id);
      let selectedSize_ = [];
      let colorSize = color.productSizes.map((size) => size.id);
      for (let sl of selectedSize) {
        if (!colorSize.includes(sl)) {
          selectedSize_.push(sl);
        }
      }
      setSelectedSize(selectedSize_);
    }
    setSelectedColor(selected);
  };
  const handleToggleSelectSize = (checked, size) => {
    let selected = [...selectedSize];
    if (checked) {
      selected.push(size);
    } else {
      selected = selected.filter((size_) => size_.id != size.id);
    }
    setSelectedSize(selected);
  };
  useEffect(() => {
    if (id) {
      dispatch(getProductUpdateById(id));
    }
  }, []);
  useLayoutEffect(() => {
    if (manager.productUpdate) {
      setProduct({
        ...product,
        name: manager.productUpdate.name,
        code: manager.productUpdate.code,
        description: manager.productUpdate.description,
        price: manager.productUpdate.price,
        listCategoryIds: manager.productUpdate?.productCategories?.map(
          (cat) => cat.id
        ),
        linkLinkImages: manager.productUpdate?.productImages?.map(
          (img) => img.linkImage
        ),
        imageBanner: manager.productUpdate.imageBanner,
        colors: manager.productUpdate.productColors,
      });
      console.log(manager.productUpdate);
    }
  }, [manager.productUpdate]);

  const handleAddSize = () => {
    let sizeExits =
      colorSize.filter((cl) => cl.sizeName == size.sizeName).length == 0;
    if (!sizeExits) {
      dispatch(setAlert({ type: "error", content: "Size exists!" }));
      return;
    }
    let colorSize_ = [...colorSize];
    colorSize_.push(size);
    setColorSize(colorSize_);
    setSize({});
  };
  const deleteJob = (item) => {
    const list = colorSize.filter((e) => e !== item);
    setColorSize(list);
  };
  const handleClearColor = () => {
    setColor({});
    setSize({});
    setColorSize([]);
    setColorImg(null);
    colorImgRef.current.value = null;
  };
  const handleSaveColor = async () => {
    let colors = [...productColors];
    let colorExists =
      colors.filter((cl) => cl.colorName == color.colorName).length == 0;
    if (!colorExists) {
      dispatch(setAlert({ type: "error", content: "Color exists!" }));
      return;
    }
    if (colorSize.length <= 0) {
      dispatch(setAlert({ type: "error", content: "Add a size!" }));
      return;
    }
    if (color?.colorName.trim() == "") {
      dispatch(setAlert({ type: "error", content: "Need color name!" }));
      return;
    }
    let downloadUrl = "";
    if (colorImg) {
      downloadUrl = await uploadNoCallBack(colorImg);
      setColorImgUploaded(downloadUrl);
    }
    const aColor = {
      colorName: color?.colorName,
      linkImage: downloadUrl ? downloadUrl : "",
      size: colorSize,
    };
    colors.push(aColor);
    setProductColors(colors);
    handleClearColor();
  };
  const deleteColor = (item) => {
    let list = productColors.filter((cl) => cl.colorName != item.colorName);
    setProductColors(list);
  };
  useLayoutEffect(() => {}, [productColors]);
  return (
    <HomeAdmin>
      <div className="w-10/12 bg-slate-700 text-white h-screen flex flex-col overflow-y-hidden ">
        <HeaderAdmin />
        <div className="w-full overflow-x-hidden ">
          <main className="w-full flex-grow p-6">
            <h1 className="w-full text-3xl pb-6">{t("update_product")}</h1>

            <div className="flex flex-wrap">
              <div className="w-full my-6 pr-0 lg:pr-2">
                <div className="leading-loose">
                  <div className="p-10 bg-white rounded shadow-xl">
                    <div>
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtCode"
                      >
                        {t("product_code")}
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            code: e.target.value,
                          })
                        }
                        value={product?.code}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        id="txtCode"
                        name="txtCode"
                        type="text"
                        required
                        placeholder={t("enter_code_product")}
                        aria-label="txtCode"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtName"
                      >
                        {t("name_product")}
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            name: e.target.value,
                          })
                        }
                        value={product?.name}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        id="txtName"
                        name="txtName"
                        type="text"
                        required
                        placeholder={t("enter_name_product")}
                        aria-label="txtName"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtPrice"
                      >
                        {t("price")}
                      </label>
                      <input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            price: e.target.value,
                          })
                        }
                        value={product?.price}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        id="txtPrice"
                        name="txtPrice"
                        type="number"
                        required
                        placeholder={t("enter_price_product")}
                        aria-label="txtPrice"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtName"
                      >
                        {t("Product category")}
                      </label>
                      <select
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            categoryId: e.target.value,
                          })
                        }
                      >
                        {categories.map((cat, index) => {
                          if (!cat.isPrimary) {
                            return (
                              <option key={index} value={cat.id}>
                                {cat.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    <div className="mt-2">
                      <label
                        className=" block text-base text-gray-600"
                        htmlFor="message"
                      >
                        {t("describe")}
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={manager?.productUpdate?.description || ""}
                        onReady={(editor) => {}}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setProduct({
                            ...product,
                            description: data,
                          });
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtName"
                      >
                        {t("product banner image")}
                      </label>
                      <input
                        onChange={(e) => setImageBanner(e.target.files[0])}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        id="txtName"
                        name="txtName"
                        type="file"
                        required
                        placeholder={t("enter_name_product")}
                        aria-label="txtName"
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
                    <div className="mt-2">
                      <label
                        className="block text-base text-gray-600"
                        htmlFor="txtName"
                      >
                        {t("product images")}
                      </label>
                      <input
                        onChange={(e) => {
                          setImages([...e.target.files]);
                        }}
                        className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                        type="file"
                        required
                        multiple
                      />
                      <div className="my-2">
                        <div className="flex flex-row gap-2 flex-wrap">
                          {images.map((img, index) => {
                            return (
                              <img
                                key={index}
                                src={URL.createObjectURL(img)}
                                style={{
                                  maxWidth: "240px",
                                  maxHeight: "240px",
                                  borderRadius: 4,
                                  objectFit: "cover",
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="grid grid-cols-2 w-full gap-4">
                        <div className="border-2 col-span-1 p-2 text-black max-h-screen overflow-y-auto overflow-hidden">
                          <div className="flex justify-between">
                            <button onClick={handleClearColor} className="mx-2">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              onClick={handleSaveColor}
                              className="text-sm rounded px-3 py-2 font-bold px-2 bg-black text-white"
                            >
                              save
                            </button>
                          </div>
                          <div className="color ">
                            <div className="input">
                              <label htmlFor="color" className="text-sm">
                                Tên màu
                              </label>
                              <input
                                onChange={(e) =>
                                  setColor({
                                    ...color,
                                    colorName: e.target.value,
                                  })
                                }
                                value={color?.colorName}
                                type="text"
                                id="color"
                                name="color"
                                className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                              />
                            </div>
                            <div className="image-upload">
                              <label htmlFor="color" className="text-sm">
                                Ảnh
                              </label>
                              <input
                                ref={colorImgRef}
                                onChange={(e) => setColorImg(e.target.files[0])}
                                type="file"
                                id="color"
                                name="color"
                                className="w-full px-5 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0"
                              />
                            </div>
                            <div className="img py-3">
                              {colorImg && (
                                <img
                                  style={{
                                    objectFit: "cover",
                                  }}
                                  src={URL.createObjectURL(colorImg)}
                                  alt=""
                                  className="mx-auto h-36 w-36"
                                />
                              )}
                            </div>
                          </div>
                          <div className="size">
                            <div className="flex">
                              <input
                                type="text"
                                id="color"
                                name="color"
                                className="px-2 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0 w-2/3"
                                placeholder="size"
                                value={size?.sizeName || ""}
                                onChange={(e) =>
                                  setSize({
                                    ...size,
                                    sizeName: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="number"
                                id="color"
                                name="color"
                                className="px-2 mx-1 text-sm py-2 text-gray-700 bg-gray-200 rounded outline-0 w-1/3"
                                placeholder="số lượng"
                                value={size?.quantity || ""}
                                onChange={(e) =>
                                  setSize({
                                    ...size,
                                    quantity: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              className="bg-gray-200 py-1 px-2 rounded-sm text-sm"
                              onClick={() => handleAddSize()}
                            >
                              Thêm size
                            </button>
                            <div className="list-todo py-2">
                              <ul>
                                {colorSize.map((item, key) => (
                                  <li
                                    key={key}
                                    className="todo-item justify-between flex py-0.5 border-b-gray-200 border-b-2 mb-2 px-2"
                                  >
                                    <div>
                                      <div>
                                        <span className="text-xs font-bold">
                                          Size:{" "}
                                        </span>
                                        <span className="text-xs">
                                          {item.sizeName}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-xs font-bold">
                                          Số lượng:{" "}
                                        </span>
                                        <span className="text-xs">
                                          {item.quantity}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      className="todo-exit cursor-pointer"
                                      onClick={() => deleteJob(item)}
                                    >
                                      &times;
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="border-2 col-span-1 p-2 text-black max-h-screen overflow-y-auto overflow-hidden">
                          <div className="list-todo py-2">
                            <ul>
                              {productColors.map((item, key) => (
                                <li
                                  key={key}
                                  className="todo-item justify-between flex py-0.5 border-b-gray-200 border-b-2 mb-2 px-2"
                                >
                                  <div>
                                    <div>
                                      <span className="text-xs font-bold">
                                        Color :
                                      </span>
                                      <span className="text-xs">
                                        {item.colorName}
                                      </span>
                                    </div>
                                  </div>
                                  <span
                                    className="todo-exit cursor-pointer"
                                    onClick={() => deleteColor(item)}
                                  >
                                    &times;
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <Link
                        to={"/admin/product-manager"}
                        type="button"
                        className="px-4 py-1 text-white font-light tracking-wider mx-3 rounded"
                        style={{
                          backgroundColor: "black",
                        }}
                      >
                        {t("come_back")}
                      </Link>
                      <button
                        onClick={handleUpdateProduct}
                        className="px-4 py-1 text-white font-light tracking-wider  rounded"
                        style={{
                          backgroundColor: "black",
                        }}
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

export default ProductUpdate;
