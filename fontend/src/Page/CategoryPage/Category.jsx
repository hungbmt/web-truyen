import { Col, Container, Row } from "react-bootstrap";
import "./Category.css";
import CategoryLeft from "../../Component/CategoryComponent/CategoryLeft/CategoryLeft";
import CategoryRight from "../../Component/CategoryComponent/CategoryRight/CategoryRight";
import { useEffect } from "react";
import { apiCategory } from "../../Reducer/apiReques";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
const Categoty = () => {
  const itemCategory = useSelector(
    (state) => state.categoryReducer.category.item
  );
  const categoryAll = itemCategory.listBooks;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  const { category, sub } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    apiCategory(dispatch, category, sub, page);
  }, [category, dispatch, page, sub]);
  return (
    <Container>
      <div className="category-wraper" style={{ paddingTop: 100 }}>
        <div className="title-category">
          <h6>{itemCategory?.titleWraper}</h6>
        </div>
        <Row>
          <Col xl={9}>
            <div className="category-left">
              <CategoryLeft categoryAll={categoryAll} />
            </div>
          </Col>
          <Col xl={3}>
            <div className="category-right">
              <CategoryRight />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Categoty;
