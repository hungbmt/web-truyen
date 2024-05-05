import { Col, Row } from "react-bootstrap";
import "./CategoryLeft.css";
import { Link } from "react-router-dom";

const CategoryLeft = ({ categoryAll }) => {
  return (
    <>
      {categoryAll?.map((data, inx) => {
        return (
          <Link to={"/book/" + data.newUrl}>
            <div className="category-left-box">
              <Row style={{ width: "100%" }}>
                <Col xl={3}>
                  <img src={data?.dataImage} alt="" />
                </Col>
                <Col xl={7} className="align-content-center">
                  <h3>{data?.title}</h3>
                  <h6>{data?.author}</h6>
                </Col>
                <Col xl={2} className="align-content-center">
                  <span>{data?.totalChap}</span>
                </Col>
              </Row>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CategoryLeft;
