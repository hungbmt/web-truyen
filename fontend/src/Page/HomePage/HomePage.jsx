import { useEffect } from "react";
import BannerHomeComponent from "../../Component/BannerComponent/BannerComponent";
import "./HomePage.css";
import { apiGetHome } from "../../Reducer/apiReques";
import { useDispatch, useSelector } from "react-redux";
import BookHomeUpdata from "../../Component/BookHomeUpdata/BookHomeUpdata";
import BookComplete from "../../Component/BookCompleteComponent/BookComplete";

const HomePage = () => {
  const dispatch = useDispatch();
  const itemHome = useSelector((state) => state.getHomeReducer.getHome.item);
  const hotBook = itemHome?.hotBook;
  const newBook = itemHome?.newBook;
  const bookcomplete = itemHome?.BookComplete;
  useEffect(() => {
    apiGetHome(dispatch);
  }, [dispatch]);
  return (
    <>
      <div className="home-wrapper">
        {/* banner */}
        <div className="title-home" style={{ paddingTop: "100px" }}>
          <h6>
            <i class="fa-solid fa-fire-flame-curved pe-2 "></i>
            Truyện Hot
          </h6>
        </div>
        <div className="banner-wrapper">
          <BannerHomeComponent hotBook={hotBook} />
        </div>
      </div>
      <div className="title-home" style={{ paddingTop: "40px" }}>
        <h6>Truyện Mới Cập Nhật</h6>
      </div>
      <div className="book-home-updata-wrapper">
        <BookHomeUpdata newBook={newBook} />
      </div>
      <div className="title-home" style={{ paddingTop: "40px" }}>
        <h6>Truyện Hoàn Thành</h6>
      </div>
      <div className="book-home-compile-wrapper">
        <BookComplete bookcomplete={bookcomplete} />
      </div>
    </>
  );
};

export default HomePage;
