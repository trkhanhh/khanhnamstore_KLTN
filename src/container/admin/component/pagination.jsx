import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Pagination({ totalPage, setPage }) {
    const arrPage = [];
  for (let i = 1; i <= totalPage; i++) {
    arrPage.push(i);
  }
  return (
    <div className="pagination">
      <button>&laquo;</button>
      {arrPage.map((item, index) => (
        <button onClick={() => setPage(item)} key={index}>
          {item}
        </button>
      ))}
      <button>&raquo;</button>

    </div>
  );
}

export default Pagination;
