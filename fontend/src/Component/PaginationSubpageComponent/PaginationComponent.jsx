import { Link, useLocation, useNavigate } from "react-router-dom";

const PaginationSubpage = ({ totalPage, currenPage, rangePage, sub, page }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let mide = Math.ceil(rangePage / 2);
  let min = Math.max(1, currenPage - mide + 1);
  let max = Math.min(totalPage, min + rangePage - 1);
  let pages = [];
  let currenPages =
    Number(new URLSearchParams(location.search).get("page")) || 1;
  const handlePrev = () => {
    // Cập nhật trang hiện tại khi nhấp vào nút "prew"
    if (currenPages > 1) {
      navigate(`/${sub}?page=${currenPages - 1}`);
    }
  };

  const handleNext = () => {
    // Cập nhật trang hiện tại khi nhấp vào nút "next"
    if (currenPages < totalPage) {
      navigate(`/${sub}?page=${currenPages + 1}`);
    }
  };
  for (let i = min; i <= max; i++) {
    pages.push(i);
    // if (!isNaN(i)) {
    //   pages.push(Math.min(i, totalPage));
    // }
    pages = pages.filter((page) => !isNaN(page));
  }

  return (
    <>
      <div className="pagination-subpage-box">
        <button onClick={handlePrev}>prew</button>
        {pages.map((pagi, ix) => {
          return (
            <button key={ix}>
              <Link to={`/book/${sub}?page=${pagi}`}>{pagi}</Link>
            </button>
          );
        })}
        <button onClick={handleNext}>next</button>
      </div>
    </>
  );
};

export default PaginationSubpage;
