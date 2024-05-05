import { Col, Row } from "react-bootstrap";
import "./BannerComponent.css";
import { Link } from "react-router-dom";
const BannerHomeComponent = ({ hotBook }) => {
  return (
    <>
      <Row>
        <div className="banner-box">
          <Col xl={11}>
            <div className="banner-left">
              {hotBook?.map((itemBookHot, idx) => {
                return (
                  <Link to={`${"/book" + itemBookHot.Link + "?page=1"}`}>
                    <div className="book-box">
                      <img src={itemBookHot.imgBook} alt="" />
                      <div className="title-book">
                        <h4>{itemBookHot.title}</h4>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
};

export default BannerHomeComponent;
