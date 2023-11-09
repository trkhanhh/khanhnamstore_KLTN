import { useDispatch } from "react-redux";
import { setPage } from "../../../slices/ProductSlice";

function Pagination({ totalPage,setPage }) {
  const dispatch = useDispatch();
  const arrPage = [];
  for (let i = 1; i <= totalPage; i++) {
    arrPage.push(i);
  }
  return (
    <div className="pagination-product">
      {arrPage.map((item, index) => (
        <button onClick={() => dispatch(setPage(item - 1))} key={index}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
