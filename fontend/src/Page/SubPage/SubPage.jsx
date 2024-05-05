import { Col, Container, Row } from "react-bootstrap";
import "./Subpage.css";
import InfoHolder from "../../Component/SubPageLeftComponent/InfoHolder/InfoHolder";
import Description from "../../Component/SubPageLeftComponent/Description/Descriptinon";
import ListChapter from "../../Component/SubPageLeftComponent/ListChapter/ListChapter";
import { useEffect } from "react";
import { apigetSubpage } from "../../Reducer/apiReques";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PaginationSubpage from "../../Component/PaginationSubpageComponent/PaginationComponent";

const SubPage = () => {
  const itemSubpage = useSelector((state) => state.subpageReducer.subpage.item);
  const dispatch = useDispatch();
  const { sub } = useParams();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
  const totalPage = itemSubpage?.totalPage;
  const currenPage = itemSubpage?.currenPage;
  const rangePage = itemSubpage?.rangePage;

  useEffect(() => {
    apigetSubpage(dispatch, sub, page);
  }, [dispatch, page, sub]);
  return (
    <>
      <div className="subpage-wrapper">
        <Container>
          <Row>
            <Col xl={9}>
              <div
                className="title-subpae-shared"
                style={{ marginBottom: "20px" }}
              >
                <h6>Thông Tin Truyện</h6>
              </div>
              <Row>
                <Col xl={4} className="info-holder">
                  <InfoHolder itemSubpage={itemSubpage} />
                </Col>
                <Col xl={8} className="decription-wrapper">
                  <Description itemSubpage={itemSubpage} />
                </Col>
                <div
                  className="title-subpae-shared"
                  style={{ marginTop: "40px" }}
                >
                  <h6>Danh Sách Truyện</h6>
                </div>
                <div className="subpage-chapter-box mb-5">
                  <ListChapter itemSubpage={itemSubpage} />
                </div>
                <div
                  className="paginarion-wraper text-center"
                  style={{ marginBottom: 20 }}
                >
                  <PaginationSubpage
                    totalPage={totalPage}
                    currenPage={currenPage}
                    rangePage={rangePage}
                    sub={sub}
                    page={page}
                  />
                </div>
              </Row>
            </Col>
            <Col xl={3}>2</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SubPage;
