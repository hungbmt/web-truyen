import { Link } from "react-router-dom";
import "./InfoHolder.css";
const InfoHolder = ({ itemSubpage }) => {
  return (
    <>
      <div className="book">
        <img src={itemSubpage?.imageBook} alt="" />
      </div>
      <div className="info" style={{ marginTop: "40px" }}>
        <div>
          <h3>Tác Giả:</h3>
          <span>{itemSubpage?.author}</span>
        </div>
        <div>
          <h3>Thể Loại:</h3>
          {itemSubpage?.genres?.map((item, ix) => {
            return (
              <>
                <Link>{item} , </Link>
              </>
            );
          })}
        </div>
        <div>
          <h3>Nguồn:</h3>
          <span>{itemSubpage?.source}</span>
        </div>
        <div>
          <h3>Trạng Thái:</h3>
          <span>{itemSubpage?.status}</span>
        </div>
      </div>
    </>
  );
};

export default InfoHolder;
